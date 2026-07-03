'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'
import { CMSLink } from '@/components/Link/index'
import { SvgMedia } from '@/components/Media'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
  }, [pathname, setHeaderTheme])

  return (
    <header
      suppressHydrationWarning
      className="px-6 relative z-20 bg-surface max-w-full mx-0"
      {...(headerTheme ? { 'data-theme': headerTheme } : {})}
    >
      <div className="py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center flex-row gap-2">
          <p className="text-2xl md:text-3xl font-bold text-surface-tint">Saigon 45</p>
          <SvgMedia className="h-8 w-8 md:h-12 md:w-12" resource={data.media} />
        </Link>
        <HeaderNav data={data} />
        {data?.WoltCTA && data?.WoltCTA.length > 0 && (
          <CMSLink {...data.WoltCTA[0].link} className="text-surface " appearance="default" />
        )}
      </div>
    </header>
  )
}
