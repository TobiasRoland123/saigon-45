'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { HeaderNav } from './index'
import { Icon } from '@/components/icons'

const MOBILE_NAV_ID = 'header-mobile-nav'

const hasNavItems = (data: HeaderType) => Boolean(data?.navItems?.length)

type ToggleProps = {
  data: HeaderType
  isOpen: boolean
  onToggle: () => void
}

export const MobileNavToggle: React.FC<ToggleProps> = ({ data, isOpen, onToggle }) => {
  if (!hasNavItems(data)) return null

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
  data: HeaderType
  isOpen: boolean
  onClose: () => void
}

export const MobileNavPanel: React.FC<PanelProps> = ({ data, isOpen, onClose }) => {
  if (!hasNavItems(data)) return null

  return (
    <div
      id={MOBILE_NAV_ID}
      hidden={!isOpen}
      onClick={onClose}
      className="container px-6 pb-6 md:hidden"
    >
      <HeaderNav data={data} orientation="vertical" />
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
