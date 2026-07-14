import type { MenuItemGridBlock as MenuItemGridBlockProps } from '@/payload-types'

import { MenuItemCard } from '@/blocks/MenuItemGrid/Card'
import { cn } from '@/utilities/ui'
import React from 'react'

type Props = MenuItemGridBlockProps & {
  className?: string
}

export const MenuItemGridBlock: React.FC<Props> = ({ category, className, heading, items }) => {
  if (!items?.length) return null

  return (
    <section className={cn('py-12 md:py-20', className)}>
      <div className="container">
        <div className="flex flex-col justify-between gap-3 border-l-8 border-secondary pl-8 md:flex-row md:items-end">
          <h2 className="py-3 text-4xl leading-none font-bold tracking-tight text-primary">
            {heading}
          </h2>
          {category ? (
            <p className="text-sm font-extrabold tracking-[0.12em] text-outline uppercase">
              {category}
            </p>
          ) : null}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <MenuItemCard
              badges={item.badges}
              description={item.description}
              featured={Boolean(item.highlighted)}
              index={index}
              key={item.id ?? `${item.name}-${index}`}
              media={item.media}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
