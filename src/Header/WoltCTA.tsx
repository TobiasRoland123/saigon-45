import React from 'react'

import type { HeaderNavLink } from './types'

import { CMSLink } from '@/components/Link/index'

/** The single Wolt ordering link from the header global, if an editor set one. */
export const WoltCTA: React.FC<{ link?: HeaderNavLink }> = ({ link }) => {
  if (!link) return null

  return <CMSLink {...link} className="text-surface" appearance="default" />
}
