import type { ComponentType, SVGProps } from 'react'
import { Linkedin } from 'lucide-react'
import {
  siFacebook,
  siInstagram,
  siPinterest,
  siTiktok,
  siWhatsapp,
  siX,
  siYoutube,
} from 'simple-icons'
import type { SimpleIcon } from 'simple-icons'

type SocialIconComponent = ComponentType<SVGProps<SVGSVGElement>>

// simple-icons exports path data, not components — wrap each icon's path/hex
// in a plain <svg> so it can be dropped into the same registry as lucide icons.
const brandIcon = (icon: SimpleIcon): SocialIconComponent => {
  const BrandIcon: SocialIconComponent = ({ fill, ...props }) => (
    <svg
      fill={fill ?? `#${icon.hex}`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d={icon.path} />
    </svg>
  )
  BrandIcon.displayName = `BrandIcon(${icon.title})`

  return BrandIcon
}

export type SocialIconDefinition = {
  label: string
  Icon: SocialIconComponent
}

export const socialIconRegistry = {
  facebook: { label: 'Facebook', Icon: brandIcon(siFacebook) },
  instagram: { label: 'Instagram', Icon: brandIcon(siInstagram) },
  x: { label: 'X (Twitter)', Icon: brandIcon(siX) },
  // LinkedIn asked simple-icons to remove its brand mark, so this one falls
  // back to lucide's generic (non-brand-exact) icon instead.
  linkedin: { label: 'LinkedIn', Icon: Linkedin },
  youtube: { label: 'YouTube', Icon: brandIcon(siYoutube) },
  tiktok: { label: 'TikTok', Icon: brandIcon(siTiktok) },
  whatsapp: { label: 'WhatsApp', Icon: brandIcon(siWhatsapp) },
  pinterest: { label: 'Pinterest', Icon: brandIcon(siPinterest) },
} as const satisfies Record<string, SocialIconDefinition>

export type SocialPlatform = keyof typeof socialIconRegistry

export const socialPlatformOptions = Object.entries(socialIconRegistry).map(([value, icon]) => ({
  label: icon.label,
  value: value as SocialPlatform,
}))
