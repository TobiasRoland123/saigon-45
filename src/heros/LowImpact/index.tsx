import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText }) => {
  return (
    <div className="container mt-10">
      <div className="max-w-3xl">
        {children ||
          (richText && (
            <RichText
              className="mb-8 max-w-none [&_a]:text-inverse-primary [&_a]:underline [&_a]:decoration-inverse-primary/50 [&_a]:decoration-2 [&_a]:underline-offset-2 [&_a]:hover:text-tertiary-fixed [&_h1]:mb-5 [&_h1]:text-3xl [&_h1]:leading-[1.05] [&_h1]:font-extrabold [&_h1]:tracking-normal [&_h1]:text-surface-tint md:[&_h1]:text-6xl [&_p]:max-w-156 [&_p]:text-base [&_p]:leading-8 md:[&_p]:text-lg"
              data={richText}
              enableGutter={false}
            />
          ))}
      </div>
    </div>
  )
}
