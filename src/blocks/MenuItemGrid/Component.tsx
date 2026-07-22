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

  let occupiedColumns = 0
  let finalItemFillsRow = false

  for (const [index, item] of populatedItems.entries()) {
    const columnSpan = item.highlighted ? 2 : 1

    if (occupiedColumns + columnSpan > 3) occupiedColumns = 0

    if (index === populatedItems.length - 1) {
      finalItemFillsRow = occupiedColumns === 0
      break
    }

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

        <div className="grid grid-flow-row gap-6 pt-10 md:grid-cols-2 lg:grid-cols-3">
          {populatedItems.map((item, index) => (
            <MenuItemCard
              badges={item.badges}
              description={item.description}
              featured={Boolean(item.highlighted)}
              fillsRow={finalItemFillsRow && index === populatedItems.length - 1}
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
