import type { MenuItem, MenuItemGridBlock as MenuItemGridBlockProps } from '@/payload-types'

import { MenuItemCard } from '@/blocks/MenuItemGrid/Card'
import { cn } from '@/utilities/ui'
import React from 'react'

type Props = MenuItemGridBlockProps & {
  className?: string
}

export const MenuItemGridBlock: React.FC<Props> = ({ category, className, heading, items }) => {
  const populatedItems = items?.filter((item): item is MenuItem => typeof item !== 'number') ?? []

  if (!populatedItems.length) return null

  const rows: MenuItem[][] = []
  let occupiedColumns = 0

  for (const item of populatedItems) {
    const columnSpan = item.highlighted ? 2 : 1

    if (occupiedColumns + columnSpan > 3) {
      occupiedColumns = 0
    }

    if (occupiedColumns === 0) rows.push([])

    rows.at(-1)?.push(item)
    occupiedColumns += columnSpan
    if (occupiedColumns === 3) occupiedColumns = 0
  }

  return (
    <section className={cn('py-12 md:py-20', className)}>
      <div className="container">
        <div className="flex flex-col justify-between gap-3 border-l-4 border-secondary pl-7 md:flex-row md:items-center">
          <h2 className="text-[2rem] leading-[1.2] font-bold tracking-tight text-primary">
            {heading}
          </h2>
          {category ? (
            <p className="text-xs leading-[1.2] font-bold tracking-widest text-outline uppercase">
              {category}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-6 pt-10">
          {rows.map((row, rowIndex) => (
            <div
              className="flex flex-col gap-6 md:flex-row md:flex-wrap lg:flex-nowrap"
              key={rowIndex}
            >
              {row.map((item, columnIndex) => (
                <MenuItemCard
                  badges={item.badges}
                  description={item.description}
                  featured={Boolean(item.highlighted)}
                  index={populatedItems.indexOf(item)}
                  key={item.id ?? `${item.name}-${rowIndex}-${columnIndex}`}
                  media={item.media}
                  name={item.name}
                  price={item.price}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
