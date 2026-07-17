import type { LucideIcon } from 'lucide-react'
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Clock,
  ExternalLink,
  Leaf,
  Mail,
  MapPin,
  Phone,
  Search,
  Share2,
  Star,
  Quote,
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
  externalLink: {
    label: 'External link',
    Icon: ExternalLink,
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
  mail: {
    label: 'Mail',
    Icon: Mail,
  },
  search: {
    label: 'Search',
    Icon: Search,
  },
  share: {
    label: 'Share',
    Icon: Share2,
  },
  star: {
    label: 'Star',
    Icon: Star,
  },
  quote: {
    label: 'Quote',
    Icon: Quote,
  },
} as const satisfies Record<string, IconDefinition>

export type IconName = keyof typeof iconRegistry

export const iconOptions = Object.entries(iconRegistry).map(([value, icon]) => ({
  label: icon.label,
  value: value as IconName,
}))
