'use client'
import Link from 'next/link'
import React from 'react'

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'
import { MobileNavBackdrop, MobileNavPanel, MobileNavToggle } from './Nav/MobileNav'
import { WoltCTA } from './WoltCTA'
import { useMobileMenu } from './hooks/useMobileMenu'
import { SvgMedia } from '@/components/Media'
import { cn } from '@/utilities/ui'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const { close, isOpen, toggle } = useMobileMenu()

  return (
    <header suppressHydrationWarning className="relative z-20">
      <div
        className={cn(
          'relative z-20 bg-surface transition-shadow',
          isOpen && 'rounded-b-3xl shadow-header-menu md:rounded-b-none md:shadow-none',
        )}
      >
        <div className="container flex items-center justify-between gap-3 px-6 py-3 md:py-6">
          <Link href="/" className="flex flex-row items-center gap-2">
            <p className="text-2xl font-bold text-surface-tint md:text-3xl">Saigon 45</p>
            <SvgMedia className="h-8 w-8 md:h-12 md:w-12" resource={data.media} />
          </Link>

          <div className="hidden md:block">
            <HeaderNav data={data} />
          </div>

          <div className="flex items-center gap-2">
            <WoltCTA data={data} />
            <MobileNavToggle data={data} isOpen={isOpen} onToggle={toggle} />
          </div>
        </div>

        <MobileNavPanel data={data} isOpen={isOpen} onClose={close} />
      </div>

      <MobileNavBackdrop isOpen={isOpen} onClose={close} />
    </header>
  )
}
