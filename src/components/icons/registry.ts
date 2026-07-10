import type { LucideIcon } from 'lucide-react'
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Clock,
  Leaf,
  MapPin,
  Phone,
  Search,
  Star,
} from 'lucide-react'

export type IconDefinition = {
  label: string
  Icon: LucideIcon
}

export const iconRegistry = {
  arrowLeft: {
    label: 'Arrow left',
    Icon: ArrowLeft,
  },
  arrowRight: {
    label: 'Arrow right',
    Icon: ArrowRight,
  },
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
  badgeCheck: {
    label: 'Badge check',
    Icon: BadgeCheck,
  },
  leaf: {
    label: 'Leaf',
    Icon: Leaf,
  },
  search: {
    label: 'Search',
    Icon: Search,
  },
  star: {
    label: 'Star',
    Icon: Star,
  },
} as const satisfies Record<string, IconDefinition>

export type IconName = keyof typeof iconRegistry

export const iconOptions = Object.entries(iconRegistry).map(([value, icon]) => ({
  label: icon.label,
  value: value as IconName,
}))
