'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

type HeaderNavProps = {
  data: HeaderType
  orientation?: 'horizontal' | 'vertical'
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ data, orientation = 'horizontal' }) => {
  const navItems = data?.navItems || []

  if (orientation === 'vertical') {
    return (
      <nav className="flex flex-col">
        {navItems.map(({ link }, i) => {
          return (
            <CMSLink
              key={i}
              {...link}
              appearance="inline"
              className="flex min-h-15 items-center border-b border-outline-variant py-4 text-xl font-bold tracking-tight text-on-surface last:border-b-0"
            />
          )
        })}
      </nav>
    )
  }

  return (
    <nav className="flex items-center gap-6">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" />
      })}
    </nav>
  )
}
