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

export const MenuItemGridBlock: React.FC<Props> = ({ category, className, heading, items }) => {
  if (!items?.length) return null

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

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <MenuItemCard
              badges={item.badges}
              ctaLabel={item.link?.label}
              description={item.description}
              featured={Boolean(item.highlighted)}
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
      </div>
    </section>
  )
}
