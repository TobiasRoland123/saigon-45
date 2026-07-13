import type { MenuItemGridBlock as MenuItemGridBlockProps } from '@/payload-types'

import { MenuItemCard } from '@/blocks/MenuItemGrid/Card'
import { cn } from '@/utilities/ui'
import React from 'react'

type Props = MenuItemGridBlockProps & {
  className?: string
}

type MenuItem = NonNullable<MenuItemGridBlockProps['items']>[number]

const getItemHref = (item: MenuItem) => {
  const { link } = item

  if (link?.type === 'reference' && typeof link.reference?.value === 'object') {
    const { relationTo, value } = link.reference

    if ('slug' in value && value.slug) {
      return `${relationTo !== 'pages' ? `/${relationTo}` : ''}/${value.slug}`
    }
  }

  return link?.url
}

const MenuItemRow: React.FC<{ items: MenuItem[]; startIndex: number }> = ({
  items,
  startIndex,
}) => {
  const gridClassName = cn(
    'grid gap-8',
    items.length === 1
      ? 'grid-cols-1'
      : items.length === 2
        ? 'md:grid-cols-2'
        : 'md:grid-cols-2 lg:grid-cols-3',
  )

  return (
    <div className={gridClassName}>
      {items.map((item, index) => (
        <MenuItemCard
          badges={item.badges}
          ctaLabel={item.link?.label}
          description={item.description}
          href={getItemHref(item)}
          index={startIndex + index}
          key={item.id ?? `${item.name}-${index}`}
          media={item.media}
          name={item.name}
          newTab={item.link?.newTab}
          price={item.price}
        />
      ))}
    </div>
  )
}

export const MenuItemGridBlock: React.FC<Props> = ({ category, className, heading, items }) => {
  if (!items?.length) return null

  const hasFeaturedLayout = items.length >= 2
  const featuredItems = hasFeaturedLayout ? items.slice(0, 2) : []
  const additionalItems = hasFeaturedLayout ? items.slice(2) : items
  const remainingRows = Array.from({ length: Math.ceil(additionalItems.length / 3) }, (_, row) =>
    additionalItems.slice(row * 3, row * 3 + 3),
  )

  return (
    <section className={cn('py-12 md:py-20', className)}>
      <div className="container">
        <div className="mb-8 flex flex-col justify-between gap-3 border-b border-primary-fixed/20 pb-5 md:mb-10 md:flex-row md:items-end">
          <h2 className="text-4xl leading-none font-extrabold tracking-tight text-primary-fixed md:text-6xl">
            {heading}
          </h2>
          {category ? (
            <p className="text-sm font-extrabold tracking-[0.12em] text-surface-dim uppercase">
              {category}
            </p>
          ) : null}
        </div>

        {hasFeaturedLayout ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredItems.map((item, index) => (
              <MenuItemCard
                badges={item.badges}
                ctaLabel={item.link?.label}
                description={item.description}
                featured={index === 0}
                href={getItemHref(item)}
                index={index}
                key={item.id ?? `${item.name}-${index}`}
                media={item.media}
                name={item.name}
                newTab={item.link?.newTab}
                price={item.price}
              />
            ))}
          </div>
        ) : null}

        {remainingRows.length ? (
          <div className="mt-8 space-y-8">
            {remainingRows.map((row, index) => (
              <MenuItemRow
                items={row}
                key={index}
                startIndex={(hasFeaturedLayout ? 2 : 0) + index * 3}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
