import type { SideBySideContentBlock as SideBySideContentBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Icon } from '@/components/icons'

export function SideBySideContentBlock(props: SideBySideContentBlockProps) {
  const { description, eyebrow, features, heading, imageCallout, media, primaryLink } = props
  return (
    <section className="mt-24 bg-background py-24">
      <div className="container grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="max-w-2xl pr-8">
          <p className="mb-8 inline-flex rounded-full bg-primary px-4 py-2 text-xs font-extrabold tracking-[0.14em] text-primary-foreground uppercase">
            {eyebrow}
          </p>

          <h2 className="text-4xl leading-tight font-extrabold text-primary md:text-5xl">
            {heading}
          </h2>

          <p className="mt-7 text-lg leading-8 text-on-surface-variant md:text-xl md:leading-9">
            {description}
          </p>

          <ul className="mt-8 space-y-4">
            {features.map((feature) => (
              <li
                className="flex items-center gap-4 text-lg text-on-surface-variant"
                key={feature.id ?? feature.label}
              >
                <span className="grid shrink-0 place-items-center text-primary">
                  <Icon name="badgeCheck" className="size-8" />
                </span>
                <span>{feature.label}</span>
              </li>
            ))}
          </ul>

          <CMSLink
            {...primaryLink}
            appearance="default"
            className="mt-12 min-h-16 rounded-lg px-10 text-base md:min-w-64"
            size="xl"
          />
        </div>

        <div className="mx-auto grid aspect-[1.02] w-full grid-cols-24 grid-rows-[repeat(24,minmax(0,1fr))] pb-10 md:aspect-[1.05] lg:pb-0">
          <div className="relative col-start-2 col-end-25 row-start-1 row-end-24 min-h-0 overflow-hidden rounded-[1.75rem] border-10 border-white">
            <Media
              fill
              imgClassName="object-cover"
              priority={false}
              resource={media}
              size="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="z-10 col-start-1 col-end-14 row-start-20 row-end-25 mr-4 max-w-56 self-end justify-self-end rounded-xl bg-secondary px-8 py-6 text-center leading-snug font-extrabold text-secondary-foreground shadow-[0_18px_50px_rgba(142,78,20,0.28)] md:col-end-10 md:mr-0 md:justify-self-start md:text-xl">
            {imageCallout}
          </div>
        </div>
      </div>
    </section>
  )
}
