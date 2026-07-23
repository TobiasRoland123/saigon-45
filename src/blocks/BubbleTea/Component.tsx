import type { BubbleTeaBlock as BubbleTeaBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

type Props = BubbleTeaBlockProps & {
  className?: string
}

export function BubbleTeaBlock({ className, heading, priceLabel, products, subtitle }: Props) {
  if (!products?.length) return null

  return (
    <section className={cn('container py-16 md:py-24', className)}>
      <div className="relative overflow-hidden rounded-[2rem] bg-primary/10 px-6 py-12 sm:px-10 md:px-14 md:py-16 lg:px-20">
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
          <p className="mt-7 shrink-0 rounded-full bg-surface-container-lowest px-6 py-3 text-base font-extrabold text-primary shadow-[0_8px_18px_rgba(12,31,28,0.1)] md:mt-0">
            {priceLabel}
          </p>
        </div>

        <div className="relative mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-x-6 gap-y-10 md:mt-16 md:gap-x-10">
          {products.map((product, index) => (
            <article
              className="min-w-0 flex-1 basis-[calc(50%-0.75rem)] text-center sm:basis-[calc(25%-1.875rem)]"
              key={product.id ?? index}
            >
              <div className="relative mx-auto aspect-square w-full max-w-48 overflow-hidden rounded-full border-4 border-surface-container-lowest bg-surface-container-low shadow-[0_12px_28px_rgba(12,31,28,0.14)]">
                <Media
                  fill
                  imgClassName="object-cover"
                  priority={index < 2}
                  resource={product.media}
                  size="(max-width: 640px) 42vw, (max-width: 1024px) 22vw, 192px"
                />
              </div>
              <h3 className="mt-4 text-base leading-snug font-bold text-primary md:text-lg">
                {product.name}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
