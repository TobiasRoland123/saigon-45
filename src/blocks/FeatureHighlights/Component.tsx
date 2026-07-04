import type { FeatureHighlightsBlock as FeatureHighlightsBlockProps } from '@/payload-types'
import { Icon } from '@/components/icons'
import React from 'react'

export const FeatureHighlightsBlock: React.FC<FeatureHighlightsBlockProps> = ({ items }) => {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container flex flex-col justify-between gap-8 py-8 md:flex-row md:py-9">
        {(items || []).map((item, index) => (
          <div className="flex items-center gap-5 md:justify-center" key={`${index}-${item.id}`}>
            <div className="grid size-12 shrink-0 place-items-center rounded-full bg-primary-foreground/10 text-primary-foreground">
              <Icon name={item.icon} className="size-5" />
            </div>
            <div>
              <p className="text-sm leading-tight font-semibold">{item.title}</p>
              <p className="mt-1 text-xs leading-tight font-bold tracking-[0.16em] text-primary-foreground/70 uppercase">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
