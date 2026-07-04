import type { MenuHighlightsBlock as MenuHighlightsBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import React from 'react'

type Props = MenuHighlightsBlockProps & {
  className?: string
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
          <article
            className="group flex min-h-[34rem] overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest shadow-[0_10px_34px_rgba(12,31,28,0.08)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_16px_44px_rgba(12,31,28,0.13)]"
            key={card.id ?? index}
          >
            <div className="flex w-full flex-col">
              <div className="relative aspect-[1.36] overflow-hidden bg-surface-container">
                <Media
                  fill
                  imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={index < 3}
                  resource={card.media}
                  size="(max-width: 1024px) 100vw, 33vw"
                />

                {card.badge && (
                  <span className="text-on-secondary absolute top-5 right-5 rounded-full bg-secondary px-5 py-2 text-sm font-bold tracking-wide uppercase shadow-sm">
                    {card.badge}
                  </span>
                )}

                {card.imageLabel && (
                  <div className="absolute inset-x-6 bottom-6 rounded-lg bg-white/90 px-5 py-3 text-center text-xl font-bold text-primary shadow-sm backdrop-blur-sm md:text-2xl">
                    {card.imageLabel}
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-8 md:p-10">
                <h3 className="text-3xl leading-tight font-bold text-primary md:text-4xl">
                  {card.title}
                </h3>
                <p className="mt-6 text-lg leading-relaxed text-on-surface-variant md:text-xl">
                  {card.description}
                </p>

                <CMSLink
                  {...card.link}
                  appearance="inline"
                  className="mt-auto inline-flex pt-12 text-xl font-bold text-primary no-underline hover:text-primary/80"
                >
                  <span aria-hidden="true">-&gt;</span>
                </CMSLink>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
