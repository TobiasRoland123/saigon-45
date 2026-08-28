import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link/index'

/** The single Wolt ordering link from the header global, if an editor set one. */
export const WoltCTA: React.FC<{ data: HeaderType }> = ({ data }) => {
  const link = data?.WoltCTA?.[0]?.link

  if (!link) return null

  return <CMSLink {...link} className="text-surface" appearance="default" />
}
