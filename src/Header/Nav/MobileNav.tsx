import React from 'react'

import type { HeaderNavItem } from '../types'

import { HeaderNav } from './index'
import { Icon } from '@/components/icons'
import { cn } from '@/utilities/ui'

//ID used for aria-controls and to identify the mobile nav panel for inert attribute
const MOBILE_NAV_ID = 'header-mobile-nav'

type ToggleProps = {
  navItems: HeaderNavItem[]
  isOpen: boolean
  onToggle: () => void
}

export const MobileNavToggleButton: React.FC<ToggleProps> = ({ navItems, isOpen, onToggle }) => {
  if (navItems.length === 0) return null

  return (
    <button
      type="button"
      aria-controls={MOBILE_NAV_ID}
      aria-expanded={isOpen}
      onClick={onToggle}
      className="flex size-11 shrink-0 items-center justify-center rounded-md bg-surface-container-high text-on-surface md:hidden"
    >
      <Icon
        name={isOpen ? 'close' : 'menu'}
        label={isOpen ? 'Luk menu' : 'Åbn menu'}
        className="size-6"
      />
    </button>
  )
}

type PanelProps = {
  navItems: HeaderNavItem[]
  isOpen: boolean
  onClose: () => void
}

export const MobileNavPanel: React.FC<PanelProps> = ({ navItems, isOpen, onClose }) => {
  if (navItems.length === 0) return null

  return (
    <div className="pointer-events-none absolute inset-x-0 top-full overflow-hidden pb-12 md:hidden">
      <div
        id={MOBILE_NAV_ID}
        inert={!isOpen}
        onClick={onClose}
        className={cn(
          'container rounded-b-3xl bg-surface px-6 pb-2 shadow-header-menu transition-transform duration-300 ease-out motion-reduce:transition-none',
          isOpen ? 'pointer-events-auto translate-y-0' : '-translate-y-full',
        )}
      >
        <HeaderNav navItems={navItems} orientation="vertical" />
      </div>
    </div>
  )
}

export const MobileNavBackdrop: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null

  return (
    <button
      type="button"
      aria-label="Luk menu"
      onClick={onClose}
      className="fixed inset-0 z-10 cursor-default bg-on-surface/30 md:hidden"
    />
  )
}
