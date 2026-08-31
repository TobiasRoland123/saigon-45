import type { Header } from '@/payload-types'

/** A single nav entry from the header global. */
export type HeaderNavItem = NonNullable<Header['navItems']>[number]

/** The link shape shared by nav items and the Wolt CTA. */
export type HeaderNavLink = HeaderNavItem['link']
