'use client'

import DOMPurify from 'dompurify'
import React, { useEffect, useState } from 'react'

import { cn } from '@/utilities/ui'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { Media } from '@/payload-types'
import { getInlineSvgA11yProps, resolveInteractiveName } from './a11y'

type SvgRenderMode = 'inline' | 'img'

/**
 * Accepts either a `resource` prop (same as ImageMedia) or the Media fields spread directly:
 *   <SvgMedia resource={data.media} />
 *   <SvgMedia {...data.media} />
 */
interface SvgMediaBaseProps extends Partial<Media> {
  /** Override the alt text from the Media record. */
  altOverride?: string
  className?: string
  imgClassName?: string
  /** Pass the whole Media object instead of spreading fields. */
  resource?: Media | string | number | null
  onLoad?: () => void
  /**
   * 'inline' — fetches the SVG and injects it into the DOM, enabling CSS colour control via currentColor.
   * 'img'    — renders a plain <img> tag, no DOM injection. Simpler and more secure.
   * Defaults to 'img'.
   */
  mode?: SvgRenderMode
}

/**
 * The interactive variants require `altOverride` because the rendered control's only
 * content is a graphic: without a name, assistive tech announces a bare "button".
 */
type SvgMediaStaticProps = SvgMediaBaseProps & { onClick?: never; href?: never }

type SvgMediaButtonProps = SvgMediaBaseProps & {
  altOverride: string
  href?: never
  onClick: () => void
}

type SvgMediaLinkProps = SvgMediaBaseProps & {
  altOverride: string
  /** Renders an `<a>` instead of a `<button>`, for graphics that navigate. */
  href: string
  onClick?: () => void
}

export type SvgMediaProps = SvgMediaStaticProps | SvgMediaButtonProps | SvgMediaLinkProps

/**
 * Fetches and sanitises the SVG markup for `mode="inline"`. Returns null until the
 * markup for the current `url` has arrived.
 */
const useInlineSvg = (url: string, enabled: boolean): string | null => {
  const [inlineSvg, setInlineSvg] = useState<{ url: string; svg: string } | null>(null)

  useEffect(() => {
    if (!enabled || !url) return

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
  }, [url, enabled])

  return inlineSvg && inlineSvg.url === url ? inlineSvg.svg : null
}

/**
 * Wraps a decorative graphic in a real, keyboard-operable control named by `label`.
 * Native `<button>`/`<a>` are used deliberately: they are focusable and activate on
 * Enter/Space (and Enter, for links) without any `tabIndex` or `onKeyDown` of our own.
 */
const InteractiveWrapper: React.FC<{
  children: React.ReactNode
  className?: string
  href?: string
  label: string
  onClick?: () => void
}> = ({ children, className, href, label, onClick }) => {
  if (href !== undefined) {
    return (
      <a aria-label={label} className={className} href={href} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <button aria-label={label} className={className} onClick={onClick} type="button">
      {children}
    </button>
  )
}

/**
 * Resolves url and alt text from either shape the component accepts — a `resource`
 * object, or the Media fields spread directly.
 */
const resolveSvgSource = (props: SvgMediaBaseProps): { alt: string; url: string } => {
  const { altOverride, resource } = props
  // A `resource` object wins; otherwise the spread props are themselves the Media fields.
  const media = resource && typeof resource === 'object' ? (resource as Media) : props

  return {
    // Trimmed so a whitespace-only alt counts as absent everywhere downstream — it
    // names neither a control nor a `role="img"` graphic.
    alt: (altOverride ?? media.alt ?? '').trim(),
    url: getMediaUrl(media.url, media.updatedAt),
  }
}

/**
 * The graphic itself. When `interactive`, it is purely decorative — the surrounding
 * control carries the accessible name.
 */
const SvgGraphic: React.FC<{
  alt: string
  className?: string
  interactive: boolean
  onLoad?: () => void
  /** Sanitised markup for `mode="inline"`; null renders the `<img>` form. */
  svg: string | null
  url: string
}> = ({ alt, className, interactive, onLoad, svg, url }) => {
  if (svg !== null) {
    return (
      <div
        {...getInlineSvgA11yProps({ alt, interactive })}
        className={className}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    )
  }

  return (
    // next/image does not optimize SVGs — a plain <img> is the correct approach per Next.js docs.
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={interactive ? '' : alt} className={className} onLoad={onLoad} src={url} />
  )
}

export const SvgMedia: React.FC<SvgMediaProps> = (props) => {
  const { className, href, imgClassName, mode = 'img', onClick, onLoad } = props

  const { alt, url } = resolveSvgSource(props)
  const svg = useInlineSvg(url, mode === 'inline')

  // Null when no handler was given, and also when one was but the control would have
  // no accessible name — in that case we fall back to a static graphic.
  const label = resolveInteractiveName({
    alt,
    requested: Boolean(onClick || href !== undefined),
  })
  const interactive = label !== null

  if (!url) return null
  if (mode === 'inline' && svg === null) return null

  // When interactive, the wrapper owns the accessible name and the graphic is
  // decorative; `className` styles the control and `imgClassName` the graphic.
  const graphic = (
    <SvgGraphic
      alt={alt}
      className={interactive ? imgClassName : cn(className, imgClassName)}
      interactive={interactive}
      onLoad={onLoad}
      svg={mode === 'inline' ? svg : null}
      url={url}
    />
  )

  if (label === null) return graphic

  return (
    <InteractiveWrapper className={className} href={href} label={label} onClick={onClick}>
      {graphic}
    </InteractiveWrapper>
  )
}
