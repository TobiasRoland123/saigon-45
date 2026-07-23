import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import React from 'react'

type MenuItemCardProps = {
  badges?: { id?: string | null; label: string }[] | null
  description: string
  featured?: boolean
  index: number
  media: number | MediaType
  name: string
  number: number
  price: string
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  badges,
  description,
  featured = false,
  index,
  media,
  name,
  number,
  price,
}) => {
  const content = (
    <>
      <div
        className={cn(
          'relative h-48 w-full shrink-0 overflow-hidden bg-surface-container',
          featured && 'lg:h-auto lg:w-2/5',
        )}
      >
        <Media
          fill
          imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={index < 2}
          resource={media}
          size={featured ? '(max-width: 1024px) 100vw, 31vw' : '(max-width: 1024px) 100vw, 33vw'}
        />
        {featured ? (
          <span className="absolute top-6 left-6 rounded-lg bg-[#78b1a0] px-3 py-1 text-xs leading-[1.2] font-bold text-on-primary-fixed">
            Bestseller
          </span>
        ) : null}
      </div>

      <div className={cn('flex flex-1 flex-col p-6', featured && 'lg:p-10')}>
        <div className="flex items-start justify-between gap-4">
          <h3
            className={cn(
              'min-w-0 text-sm leading-[1.4] font-bold tracking-[0.01em] text-foreground',
              featured && 'lg:text-2xl lg:leading-[1.3] lg:tracking-normal',
            )}
          >
            <span className="text-outline">{number}.</span> {name}
          </h3>
          <p
            className={cn(
              'shrink-0 text-sm leading-[1.4] font-bold tracking-[0.01em] text-secondary',
              featured && 'lg:text-2xl lg:leading-[1.3] lg:tracking-normal',
            )}
          >
            {price}
          </p>
        </div>
        <p className="mt-2 text-base leading-[1.6] text-on-surface-variant">{description}</p>

        {badges?.length ? (
          <div className="mt-auto flex flex-wrap gap-1 pt-6">
            {badges.map((badge, badgeIndex) => (
              <span
                className="rounded-lg bg-surface-container px-3 py-1 text-xs leading-[1.2] font-bold text-[#1e4141]"
                key={badge.id && `${badge.label}-${badgeIndex}`}
              >
                {badge.label}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </>
  )

  const className = cn(
    'group flex w-full overflow-hidden rounded-3xl bg-surface-container-lowest shadow-[0_4px_20px_rgba(120,177,160,0.25)] transition-transform duration-200 hover:-translate-y-1 md:flex-1 md:basis-[calc(50%-0.75rem)] lg:basis-0',
    featured && 'flex-col lg:h-[21.5rem] lg:flex-row',
    featured ? 'lg:flex-[2]' : 'lg:flex-1',
    !featured && 'flex-col',
  )

  return <article className={className}>{content}</article>
}
