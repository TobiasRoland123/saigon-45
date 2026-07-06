import React from 'react'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { OpeningHoursPill } from './Component.client'

export async function OpeningHours({ className }: { className?: string }) {
  const data = await getCachedGlobal('opening-hours', 1)()

  if (!data?.address) return null

  return (
    <OpeningHoursPill
      address={data.address}
      addressUrl={data.addressUrl}
      days={data.days}
      className={className}
    />
  )
}
