'use client'
import Link from 'next/link'
import React from 'react'

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'
import { CMSLink } from '@/components/Link/index'
import { SvgMedia } from '@/components/Media'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  return (
    <header suppressHydrationWarning className="relative z-20 bg-surface">
      <div className="container flex items-center justify-between px-6 py-6">
        <Link href="/" className="flex flex-row items-center gap-2">
          <p className="text-2xl font-bold text-surface-tint md:text-3xl">Saigon 45</p>
          <SvgMedia className="h-8 w-8 md:h-12 md:w-12" resource={data.media} />
        </Link>
        <HeaderNav data={data} />
        {data?.WoltCTA && data?.WoltCTA.length > 0 && (
          <CMSLink {...data.WoltCTA[0].link} className="text-surface" appearance="default" />
        )}
      </div>
    </header>
  )
}
