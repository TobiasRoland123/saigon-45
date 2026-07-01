'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { Button } from '@/components/ui/button'
import { Media } from '@/components/Media'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <header
      suppressHydrationWarning
      className="container relative z-20"
      {...(headerTheme ? { 'data-theme': headerTheme } : {})}
    >
      <div className="py-8 flex justify-between">
        <Link href="/">
          {data?.media && typeof data.media === 'object' ? (
            <Media
              resource={data.media}
              priority
              loading="eager"
              imgClassName="h-12 w-auto object-contain"
              size="120px"
            />
          ) : (
            <Logo loading="eager" priority="high" className="invert dark:invert-0" />
          )}
        </Link>
        <HeaderNav data={data} />
        <Button variant="default">Bestil nu</Button>
      </div>
    </header>
  )
}
