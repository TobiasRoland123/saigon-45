'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Icon } from '@/components/icons'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ infoItems, links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  return (
    <div
      className="relative mt-[-10.4rem] flex min-h-[calc(100svh+10.4rem)] items-center overflow-hidden pt-[10.4rem] text-white"
      data-theme="dark"
    >
      <div className="container relative z-10 py-16 md:py-24 lg:py-32">
        <div className="max-w-172">
          {Array.isArray(infoItems) && infoItems.length > 0 && (
            <ul className="mb-6 flex w-fit max-w-full flex-col gap-3 rounded-2xl border border-white/25 bg-white/16 p-2 text-sm font-semibold text-white shadow-[0_20px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:flex-row sm:items-center sm:rounded-full sm:px-3 sm:py-2">
              {infoItems.map((item) => {
                if (!item?.label) return null

                return (
                  <li
                    className="flex min-w-0 items-center gap-2 rounded-full px-2 py-1.5"
                    key={item.id ?? item.label}
                  >
                    {item.icon && (
                      <Icon
                        className="size-4 shrink-0 text-(--color-primary-fixed)"
                        name={item.icon}
                      />
                    )}
                    <span className="truncate">{item.label}</span>
                  </li>
                )
              })}
            </ul>
          )}

          {richText && (
            <RichText
              className="mb-8 max-w-none text-white [&_h1]:mb-5 [&_h1]:max-w-[15ch] [&_h1]:text-4xl [&_h1]:font-extrabold [&_h1]:leading-[1.05] [&_h1]:tracking-normal [&_p]:max-w-156 [&_p]:text-base [&_p]:leading-8 [&_p]:text-white/88 md:[&_h1]:text-6xl md:[&_p]:text-lg"
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
                    <CMSLink
                      {...link}
                      appearance={isPrimary ? 'default' : 'outline'}
                      className={
                        'h-12 w-full rounded-2xl px-6 text-base font-bold shadow-[0_12px_36px_rgba(0,0,0,0.2)] transition-transform hover:scale-[1.02] sm:w-auto'
                      }
                      size="lg"
                    />
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
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(12,31,28,0.88)_0%,rgba(12,31,28,0.64)_42%,rgba(12,31,28,0.18)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_55%,rgba(120,177,160,0.38),transparent_34%),linear-gradient(0deg,rgba(12,31,28,0.5),transparent_45%)]" />
    </div>
  )
}
