import type { Media as MediaType } from '@/payload-types'

import { SizeBadge } from '@/blocks/BubbleTea/SizeBadge'
import { Media } from '@/components/Media'
import { formatPrice } from '@/utilities/formatPrice'
import React from 'react'

export type BubbleTeaProductCardProps = {
  isPopular?: boolean | null
  largeLabel: string
  largePrice?: number | null
  media: number | MediaType
  mediumLabel: string
  /** Nullable at runtime: rows created before M/L pricing was introduced have no price yet. */
  mediumPrice?: number | null
  name: string
  popularLabel: string
  priority?: boolean
  description?: string
}

export const ProductCard: React.FC<BubbleTeaProductCardProps> = ({
  isPopular,
  largeLabel,
  largePrice,
  media,
  mediumLabel,
  mediumPrice,
  name,
  popularLabel,
  priority,
  description,
}) => {
  const hasMedium = typeof mediumPrice === 'number'
  const hasLarge = typeof largePrice === 'number'

  return (
    <article className="min-w-0 text-center">
      <div className="relative mx-auto w-full max-w-48">
        <div className="relative aspect-square overflow-hidden rounded-full border-4 border-surface-container-lowest bg-surface-container-low shadow-[0_12px_28px_rgba(12,31,28,0.14)]">
          <Media
            fill
            imgClassName="object-cover"
            priority={priority}
            resource={media}
            size="(max-width: 640px) 42vw, (max-width: 1024px) 30vw, 192px"
          />
        </div>

        {isPopular && (
          <span className="pointer-events-none absolute top-0 -left-2 rounded-full bg-secondary px-3 py-1 text-xs font-bold tracking-wide text-primary-foreground shadow-[0_6px_14px_rgba(12,31,28,0.18)]">
            {popularLabel}
          </span>
        )}

        {/* Drops below the circle on narrow screens so it clears the popular badge opposite it. */}
        {(hasMedium || hasLarge) && (
          <div className="pointer-events-none absolute -right-2 -bottom-2 flex flex-col gap-1 rounded-lg bg-surface-container-lowest px-3 py-2 text-left shadow-[0_8px_18px_rgba(12,31,28,0.14)] md:-top-2 md:bottom-auto">
            {hasMedium && (
              <span className="inline-flex items-center gap-2 text-base font-extrabold text-primary">
                <SizeBadge size="medium" />
                <span className="sr-only">{mediumLabel}</span>
                {formatPrice(mediumPrice as number)}
              </span>
            )}

            {hasLarge && (
              <span className="inline-flex items-center gap-2 text-base font-extrabold text-secondary">
                <SizeBadge size="large" />
                <span className="sr-only">{largeLabel}</span>
                {formatPrice(largePrice as number)}
              </span>
            )}
          </div>
        )}
      </div>

      <h3 className="mt-9 text-base leading-snug font-bold text-primary md:mt-6 md:text-lg">
        {name}
      </h3>
      {description && (
        <p className="mt-2 text-sm leading-relaxed font-semibold text-outline">{description}</p>
      )}
    </article>
  )
}
