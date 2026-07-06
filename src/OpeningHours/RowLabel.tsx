'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

import type { DaySchedule } from './getOpenStatus'

const dayLabels: Record<string, string> = {
  '1': 'Mandag',
  '2': 'Tirsdag',
  '3': 'Onsdag',
  '4': 'Torsdag',
  '5': 'Fredag',
  '6': 'Lørdag',
  '0': 'Søndag',
}

export const RowLabel: React.FC<RowLabelProps> = () => {
  const { data } = useRowLabel<DaySchedule>()

  const day = data?.day ? (dayLabels[data.day] ?? 'Dag') : 'Dag'
  const hours = data?.closed ? 'Lukket' : `${data?.opensAt ?? '—'} - ${data?.closesAt ?? '—'}`

  return (
    <div>
      {day}: {hours}
    </div>
  )
}
