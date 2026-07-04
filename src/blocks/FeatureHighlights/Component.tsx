import type { FeatureHighlightsBlock as FeatureHighlightsBlockProps } from '@/payload-types'

import { Icon } from '@/components/icons'

export const FeatureHighlightsBlock: React.FC<FeatureHighlightsBlockProps> = ({ items }) => {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container grid gap-8 py-8 md:grid-cols-3 md:gap-10 md:py-9">
        {(items || []).map((item, index) => (
          <div className="flex items-center gap-5 md:justify-center" key={index}>
            <div className="grid size-16 shrink-0 place-items-center rounded-full bg-primary-foreground/10 text-primary-foreground md:size-20">
              <Icon name={item.icon} className="size-7 md:size-8" />
            </div>
            <div className="min-w-0">
              <p className="text-xl font-extrabold leading-tight md:text-2xl">{item.title}</p>
              <p className="mt-1 text-sm font-extrabold uppercase leading-tight tracking-[0.16em] text-primary-foreground/70 md:text-base">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
