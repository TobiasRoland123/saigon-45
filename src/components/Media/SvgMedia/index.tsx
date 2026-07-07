'use client'

import DOMPurify from 'dompurify'
import React, { useEffect, useState } from 'react'

import { cn } from '@/utilities/ui'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { Media } from '@/payload-types'

type SvgRenderMode = 'inline' | 'img'

/**
 * Accepts either a `resource` prop (same as ImageMedia) or the Media fields spread directly:
 *   <SvgMedia resource={data.media} />
 *   <SvgMedia {...data.media} />
 */
export interface SvgMediaProps extends Partial<Media> {
  /** Override the alt text from the Media record. */
  altOverride?: string
  className?: string
  imgClassName?: string
  /** Pass the whole Media object instead of spreading fields. */
  resource?: Media | string | number | null
  onClick?: () => void
  onLoad?: () => void
  /**
   * 'inline' — fetches the SVG and injects it into the DOM, enabling CSS colour control via currentColor.
   * 'img'    — renders a plain <img> tag, no DOM injection. Simpler and more secure.
   * Defaults to 'img'.
   */
  mode?: SvgRenderMode
}

export const SvgMedia: React.FC<SvgMediaProps> = ({
  altOverride,
  className,
  imgClassName,
  mode = 'img',
  onClick,
  onLoad,
  resource,
  // Media fields available when spread directly (<SvgMedia {...data.media} />)
  url: urlFromSpread,
  updatedAt: updatedAtFromSpread,
  alt: altFromSpread,
}) => {
  const [inlineSvg, setInlineSvg] = useState<{ url: string; svg: string } | null>(null)

  // Resolve source — prefer `resource` object, fall back to spread fields
  const mediaObj = resource && typeof resource === 'object' ? (resource as Media) : null

  const rawUrl = mediaObj?.url ?? urlFromSpread ?? null
  const cacheTag = mediaObj?.updatedAt ?? updatedAtFromSpread ?? null
  const url = getMediaUrl(rawUrl, cacheTag)
  const alt = altOverride ?? mediaObj?.alt ?? altFromSpread ?? ''

  useEffect(() => {
    if (mode !== 'inline' || !url) return

    const controller = new AbortController()

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch SVG: ${res.status}`)
        return res.text()
      })
      .then((svg) => {
        const clean = DOMPurify.sanitize(svg, {
          USE_PROFILES: { svg: true, svgFilters: true },
          FORBID_TAGS: ['script', 'use'],
          FORBID_ATTR: ['onload', 'onerror', 'onclick', 'onmouseover'],
        })
        setInlineSvg({ url, svg: clean })
      })
      .catch((err) => {
        if (err.name !== 'AbortError') console.error('[SvgMedia] Could not load inline SVG:', err)
      })

    return () => {
      controller.abort()
    }
  }, [url, mode])

  if (!url) return null

  if (mode === 'inline') {
    if (!inlineSvg || inlineSvg.url !== url) return null

    return (
      <div
        aria-label={alt}
        className={cn(className, imgClassName)}
        dangerouslySetInnerHTML={{ __html: inlineSvg.svg }}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
      />
    )
  }

  return (
    // next/image does not optimize SVGs — a plain <img> is the correct approach per Next.js docs.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      className={cn(className, imgClassName)}
      onClick={onClick}
      onLoad={onLoad}
      src={url}
    />
  )
}
