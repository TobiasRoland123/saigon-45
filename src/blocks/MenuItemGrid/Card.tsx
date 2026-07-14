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
  price: string
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  badges,
  description,
  featured = false,
  index,
  media,
  name,
  price,
}) => {
  const content = (
    <>
      <div
        className={cn(
          'relative aspect-[1.45] overflow-hidden bg-surface-container',
          featured && 'lg:aspect-auto lg:w-[41%]',
        )}
      >
        <Media
          fill
          imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={index < 2}
          resource={media}
          size="(max-width: 1024px) 100vw, 33vw"
        />
      </div>

      <div className={cn('flex flex-1 flex-col p-6 md:p-8', featured && 'lg:p-10')}>
        <div className="flex items-start justify-between gap-4">
          <h3 className="leading-tight font-extrabold text-foreground md:text-2xl">{name}</h3>
          <p className="shrink-0 font-extrabold text-secondary">{price}</p>
        </div>
        <p className="mt-4 text-base leading-relaxed text-on-surface-variant md:text-lg">
          {description}
        </p>

        {badges?.length ? (
          <div className="mt-auto flex flex-wrap gap-2 pt-7">
            {badges.map((badge, badgeIndex) => (
              <span
                className="rounded-sm bg-primary-fixed/70 px-3 py-2 text-sm font-bold text-foreground/80"
                key={badge.id ?? `${badge.label}-${badgeIndex}`}
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
    'group flex min-h-104 overflow-hidden rounded-[1.75rem] bg-surface-container-lowest shadow-[0_12px_30px_rgba(0,0,0,0.22)] transition-transform duration-200 hover:-translate-y-1',
    featured && 'lg:col-span-2 lg:min-h-128 lg:flex-row',
    !featured && 'flex-col',
  )

  return <article className={className}>{content}</article>
}
