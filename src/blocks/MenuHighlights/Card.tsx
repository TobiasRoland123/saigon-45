import type { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'
import Link from 'next/link'
import React from 'react'
import { Icon } from '@/components/icons/Icon'

export type HighlightCardProps = {
  badge?: string | null
  description: string
  imageLabel?: string | null
  link?: {
    href?: string | null
    label?: string | null
    newTab?: boolean | null
  }
  media: number | MediaType
  priority?: boolean
  title: string
  index?: number
}

export const HighlightCard: React.FC<HighlightCardProps> = ({
  badge,
  description,
  imageLabel,
  link,
  media,
  priority,
  title,
  index,
}) => {
  const newTabProps = link?.newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  return (
    <Link
      href={link?.href ?? '#'}
      {...newTabProps}
      className={
        'group flex min-h-136 overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest shadow-[0_10px_34px_rgba(12,31,28,0.08)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_16px_44px_rgba(12,31,28,0.13)] hover:md:scale-105'
      }
    >
      <div className="flex w-full flex-col">
        <div className="relative aspect-[1.36] overflow-hidden bg-surface-container">
          <Media
            fill
            imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={priority}
            resource={media}
            size="(max-width: 1024px) 100vw, 33vw"
          />

          {badge && (
            <span className="absolute top-5 right-5 rounded-full bg-secondary/90 px-5 py-2 text-sm font-bold tracking-wide text-white uppercase shadow-sm">
              {badge}
            </span>
          )}

          {imageLabel && (
            <div className="absolute inset-x-6 bottom-6 rounded-lg bg-white/90 px-5 py-3 text-center text-xl font-bold text-primary opacity-90 shadow-sm backdrop-blur-sm md:text-2xl">
              {imageLabel}
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-8 md:p-10">
          <h3 className="text-2xl leading-tight font-bold text-primary">{title}</h3>
          <p className="mt-6 text-sm leading-relaxed text-on-surface-variant">{description}</p>

          {link?.href && (
            <span className="no-underline mt-auto inline-flex items-center gap-4 pt-12 text-xl font-bold text-primary hover:text-primary/80">
              {link.label} <Icon name="arrowRight" className="size-5" />
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
