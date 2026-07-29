import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { OpeningHoursPill } from '@/OpeningHours/Component.client'
import React from 'react'

// Async server component: it awaits the `business-info` global, so it can't use
// the `React.FC` type (that can't return a Promise). RenderHero renders it as
// JSX, which supports async server components.
export const HighImpactHero = async ({ links, media, richText }: Page['hero']) => {
  const businessInfo = await getCachedGlobal('business-info', 0)()

  return (
    <div className="relative -mt-42 flex min-h-screen items-center overflow-hidden pt-26 text-white">
      <div className="relative z-10 container py-16 md:py-24 lg:py-32">
        <div className="max-w-172">
          {businessInfo?.address?.street && (
            <OpeningHoursPill
              address={businessInfo.address.street}
              addressUrl={businessInfo.address.googleMapsUrl}
              days={businessInfo.openingHours}
              className="mb-8"
            />
          )}
          {richText && (
            <RichText
              className="mb-8 max-w-none text-on-surface-variant [&_a]:text-on-surface-variant [&_a]:underline [&_a]:decoration-on-surface-variant/50 [&_a]:decoration-2 [&_a]:underline-offset-2 [&_a]:hover:text-primary [&_a]:hover:decoration-primary [&_h1]:mb-5 [&_h1]:max-w-[15ch] [&_h1]:text-4xl [&_h1]:leading-[1.05] [&_h1]:font-extrabold [&_h1]:tracking-normal md:[&_h1]:text-6xl [&_p]:max-w-156 [&_p]:text-base [&_p]:leading-8 [&_p]:text-on-surface-variant md:[&_p]:text-lg"
              data={richText}
              enableGutter={false}
            />
          )}

          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {links.map(({ link }, i) => {
                const isPrimary = i === 0

                return (
                  <li key={i}>
                    <CMSLink {...link} appearance={isPrimary ? 'default' : 'outline'} size="xl" />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      {media && typeof media === 'object' && (
        <Media
          className="absolute inset-0 -z-10 select-none"
          fill
          imgClassName="object-cover"
          pictureClassName="absolute inset-0"
          priority
          resource={media}
        />
      )}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0.64)_24%,rgba(255,255,255,0.18)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_55%,rgba(120,177,160,0.38),transparent_52%),linear-gradient(0deg,rgba(12,31,28,0.5),transparent_45%)]" />
    </div>
  )
}
