import type { Media as MediaType } from '@/payload-types'

import { Icon } from '@/components/icons/Icon'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

type MenuItemCardProps = {
  badges?: { id?: string | null; label: string }[] | null
  ctaLabel?: string | null
  description: string
  featured?: boolean
  href?: string | null
  index: number
  media: number | MediaType
  name: string
  newTab?: boolean | null
  price: string
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  badges,
  ctaLabel,
  description,
  featured = false,
  href,
  index,
  media,
  name,
  newTab,
  price,
}) => {
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}
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
          <h3 className="text-xl leading-tight font-extrabold text-primary md:text-2xl">{name}</h3>
          <p className="shrink-0 text-xl font-extrabold text-secondary md:text-2xl">{price}</p>
        </div>
        <p className="mt-4 text-base leading-relaxed text-on-surface-variant md:text-lg">
          {description}
        </p>

        {badges?.length ? (
          <div className="mt-auto flex flex-wrap gap-2 pt-7">
            {badges.map((badge, badgeIndex) => (
              <span
                className="rounded-xl bg-secondary-container px-3 py-2 text-sm font-bold text-on-secondary-container"
                key={badge.id ?? `${badge.label}-${badgeIndex}`}
              >
                {badge.label}
              </span>
            ))}
          </div>
        ) : null}

        {href && ctaLabel ? (
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">
            {ctaLabel} <Icon className="size-4" name="arrowRight" />
          </span>
        ) : null}
      </div>
    </>
  )

  const className = cn(
    'group flex min-h-104 overflow-hidden rounded-[1.75rem] bg-surface-container-lowest shadow-[0_12px_30px_rgba(0,0,0,0.22)] transition-transform duration-200 hover:-translate-y-1',
    featured && 'lg:col-span-2 lg:min-h-128 lg:flex-row',
    !featured && 'flex-col',
  )

  return href ? (
    <Link className={className} href={href} {...newTabProps}>
      {content}
    </Link>
  ) : (
    <article className={className}>{content}</article>
  )
}
