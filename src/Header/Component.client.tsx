'use client'
import Link from 'next/link'
import React from 'react'

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'
import { MobileNavBackdrop, MobileNavPanel, MobileNavToggleButton } from './Nav/MobileNav'
import { WoltCTA } from './WoltCTA'
import { useMobileMenu } from './hooks/useMobileMenu'
import { Logo } from '@/components/Logo'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const { close, isOpen, toggle } = useMobileMenu()

  const navItems = data?.navItems ?? []
  const woltLink = data?.WoltCTA?.[0]?.link

  return (
    <header suppressHydrationWarning className="relative z-20">
      <div className="relative z-20 bg-surface">
        <div className="container flex items-center justify-between gap-3 px-6 py-3 md:py-6">
          <Link href="/" className="flex w-full flex-row items-center gap-2">
            <p className="text-2xl font-bold whitespace-nowrap text-surface-tint md:text-3xl">
              Saigon 45
            </p>
            <Logo size="large" />
          </Link>

          <div className="hidden md:block">
            <HeaderNav navItems={navItems} />
          </div>

          <div className="flex items-center gap-2">
            <WoltCTA link={woltLink} />
            <MobileNavToggleButton navItems={navItems} isOpen={isOpen} onToggle={toggle} />
          </div>
        </div>

        <MobileNavPanel navItems={navItems} isOpen={isOpen} onClose={close} />
      </div>

      <MobileNavBackdrop isOpen={isOpen} onClose={close} />
    </header>
  )
}
