import type { FeatureHighlightsBlock as FeatureHighlightsBlockProps } from '@/payload-types'
import { Icon } from '@/components/icons'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import React from 'react'

type HighlightItem = FeatureHighlightsBlockProps['items'][number]

const FeatureHighlightItem: React.FC<HighlightItem> = (item) => {
  const { enableLink, link } = item
  const hasDestination =
    link?.type === 'reference'
      ? typeof link.reference?.value === 'object' && Boolean(link.reference.value?.slug)
      : Boolean(link?.url?.trim())
  const className = 'flex items-center gap-5 md:justify-center'
  const content = (
    <>
      <div className="grid size-12 shrink-0 place-items-center rounded-full bg-primary-foreground/10 text-primary-foreground">
        <Icon name={item.icon} className="size-5" />
      </div>
      <div>
        <p className="text-sm leading-tight font-semibold">{item.title}</p>
        <p className="mt-1 text-xs leading-tight font-bold tracking-[0.16em] text-primary-foreground/70 uppercase">
          {item.subtitle}
        </p>
      </div>
    </>
  )

  if (enableLink && hasDestination) {
    return (
      <CMSLink
        {...link}
        className={cn(
          className,
          'rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-primary-foreground',
        )}
      >
        {content}
      </CMSLink>
    )
  }

  return <div className={className}>{content}</div>
}

export const FeatureHighlightsBlock: React.FC<FeatureHighlightsBlockProps> = ({
  addTopMargin,
  items,
}) => {
  if (items.length === 0) return null

  return (
    <section className={cn('bg-primary text-primary-foreground', addTopMargin && 'mt-24')}>
      <div className="container flex flex-col justify-between gap-8 py-8 md:flex-row md:py-9">
        {items.map((item) => (
          <FeatureHighlightItem {...item} key={item.id} />
        ))}
      </div>
    </section>
  )
}
