import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const MediumImpactHero: React.FC<Page['hero']> = ({ badge, links, media, richText }) => {
  return (
    <section className="relative -mt-16 flex min-h-115 items-center overflow-hidden md:min-h-140 lg:min-h-155">
      <div className="relative z-10 container py-12 md:py-16">
        <div className="max-w-xl rounded-3xl bg-primary/85 p-8 shadow-xl shadow-black/10 backdrop-blur-md md:p-10">
          {badge && (
            <span className="inline-flex rounded-full border border-white/25 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/75">
              {badge}
            </span>
          )}

          {richText && (
            <RichText
              className="mt-6 max-w-none text-white [&_h1]:mb-4 [&_h1]:text-4xl [&_h1]:leading-[1.05] [&_h1]:font-extrabold [&_h1]:text-white md:[&_h1]:text-5xl [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-white/85 md:[&_p]:text-lg"
              data={richText}
              enableGutter={false}
            />
          )}

          {Array.isArray(links) && links.length > 0 && (
            <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
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
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(12,31,28,0.25)_0%,rgba(12,31,28,0.05)_55%,transparent_100%)]" />
    </section>
  )
}
