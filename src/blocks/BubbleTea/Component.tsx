import type { BubbleTeaBlock as BubbleTeaBlockProps, MenuItem } from '@/payload-types'

import { ProductCard } from '@/blocks/BubbleTea/ProductCard'
import { SizeLegend } from '@/blocks/BubbleTea/SizeLegend'
import { ToppingsCard } from '@/blocks/BubbleTea/ToppingsCard'
import { CMSLink } from '@/components/Link'
import { Icon } from '@/components/icons'
import { cn } from '@/utilities/ui'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { toAnchorId } from '@/utilities/toAnchorId'

type Props = BubbleTeaBlockProps & {
  className?: string
}

const HIGHLIGHT_COUNT = 4

// "Show all" mode ignores the hand-picked list and renders every bubble tea from the
// menu instead, ordered the same way as the collection (by menu number).
async function fetchAllBubbleTeas(): Promise<MenuItem[]> {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'menu-items',
    depth: 1,
    limit: 100,
    where: {
      subtype: { equals: 'bubble-tea' },
      type: { equals: 'drink' },
    },
  })

  return result.docs
}

export async function BubbleTeaBlock({
  className,
  heading,
  items,
  mode,
  popularLabel,
  sizeLegend,
  subtitle,
  toppings,
  viewAll,
}: Props) {
  const isHighlight = mode === 'highlight'

  // Highlight uses the editor's hand-picked variants (capped at four); "show all"
  // pulls every bubble tea straight from the collection.
  const products = isHighlight
    ? (items?.filter((item): item is MenuItem => typeof item === 'object') ?? []).slice(
        0,
        HIGHLIGHT_COUNT,
      )
    : await fetchAllBubbleTeas()

  if (!products.length) return null

  const { largeLabel, mediumLabel } = sizeLegend
  const toppingItems = toppings?.items ?? []

  return (
    <section
      className={cn('container scroll-mt-24 py-16 md:py-24', className)}
      id={toAnchorId(heading)}
    >
      <div className="relative overflow-hidden rounded-4xl bg-primary/10 px-6 py-12 sm:px-10 md:px-14 md:py-16 lg:px-20">
        <div className="pointer-events-none absolute -top-20 -right-20 size-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 size-64 rounded-full bg-secondary/5 blur-3xl" />

        <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center md:flex-row md:items-end md:justify-between md:gap-10 md:text-left">
          <div className="max-w-2xl">
            <h2 className="text-4xl leading-tight font-extrabold text-primary md:text-5xl">
              {heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-on-surface-variant md:text-lg">
              {subtitle}
            </p>
          </div>
          <SizeLegend className="mt-7 md:mt-0" largeLabel={largeLabel} mediumLabel={mediumLabel} />
        </div>

        <div className="relative mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-x-6 gap-y-10 md:mt-16 md:gap-x-10 lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard
              description={product.description}
              isPopular={product.isPopular}
              key={product.id ?? index}
              largeLabel={largeLabel}
              largePrice={product.largePrice}
              media={product.media}
              mediumLabel={mediumLabel}
              mediumPrice={product.mediumPrice}
              name={product.name}
              popularLabel={popularLabel}
              priority={index < 4}
            />
          ))}
        </div>

        {!isHighlight && toppingItems.length > 0 && toppings && (
          <div className="relative mx-auto mt-12 max-w-5xl md:mt-16">
            <ToppingsCard
              heading={toppings.heading ?? ''}
              items={toppingItems}
              priceLabel={toppings.priceLabel}
            />
          </div>
        )}

        {isHighlight && viewAll && (
          <div className="relative mt-12 flex justify-center md:mt-16">
            <CMSLink
              appearance="default"
              newTab={viewAll.newTab}
              reference={viewAll.reference}
              size="lg"
              type={viewAll.type}
              url={viewAll.url}
            >
              {viewAll.label}
              <Icon name="arrowRight" className="size-5" />
            </CMSLink>
          </div>
        )}
      </div>
    </section>
  )
}
