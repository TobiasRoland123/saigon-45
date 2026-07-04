import type { MenuHighlightsBlock as MenuHighlightsBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { MenuHighlightCard } from '@/blocks/MenuHighlights/Card'
import { cn } from '@/utilities/ui'
import React from 'react'

type Props = MenuHighlightsBlockProps & {
  className?: string
}

type MenuHighlightPayloadCard = NonNullable<MenuHighlightsBlockProps['cards']>[number]

const getCardHref = (card: MenuHighlightPayloadCard) => {
  const { link } = card

  if (link.type === 'reference' && typeof link.reference?.value === 'object') {
    const { relationTo, value } = link.reference

    if ('slug' in value && value.slug) {
      return `${relationTo !== 'pages' ? `/${relationTo}` : ''}/${value.slug}`
    }
  }

  return link.url
}

export const MenuHighlightsBlock: React.FC<Props> = ({ cards, className, heading, intro }) => {
  if (!cards?.length) return null

  return (
    <section className={cn('container pt-16', className)}>
      <div className="mx-auto mb-12 max-w-4xl text-center md:mb-16">
        <h2 className="text-4xl leading-tight font-bold text-primary">{heading}</h2>
        {intro && (
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed whitespace-pre-line text-on-surface-variant">
            {intro}
          </p>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {cards.map((card, index) => (
          <MenuHighlightCard
            badge={card.badge}
            description={card.description}
            image={
              <Media
                fill
                imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={index < 3}
                resource={card.media}
                size="(max-width: 1024px) 100vw, 33vw"
              />
            }
            imageLabel={card.imageLabel}
            key={card.id ?? index}
            link={{
              href: getCardHref(card),
              label: card.link.label,
              newTab: card.link.newTab,
            }}
            title={card.title}
          />
        ))}
      </div>
    </section>
  )
}
