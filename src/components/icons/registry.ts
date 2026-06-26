import type { LucideIcon } from 'lucide-react'
import { Clock, MapPin, Phone, Search } from 'lucide-react'

export type IconDefinition = {
  label: string
  Icon: LucideIcon
}

export const iconRegistry = {
  clock: {
    label: 'Clock',
    Icon: Clock,
  },
  mapPin: {
    label: 'Map pin',
    Icon: MapPin,
  },
  phone: {
    label: 'Phone',
    Icon: Phone,
  },
  search: {
    label: 'Search',
    Icon: Search,
  },
} as const satisfies Record<string, IconDefinition>

export type IconName = keyof typeof iconRegistry

export const iconOptions = Object.entries(iconRegistry).map(([value, icon]) => ({
  label: icon.label,
  value: value as IconName,
}))
