import type { SVGProps } from 'react'

import { cn } from '@/utilities/ui'
import { socialIconRegistry, type SocialPlatform } from './socialIconRegistry'

export type SocialIconProps = {
  platform: SocialPlatform
} & SVGProps<SVGSVGElement>

export const SocialIcon: React.FC<SocialIconProps> = ({ platform, className, ...props }) => {
  const IconComponent = socialIconRegistry[platform].Icon

  return <IconComponent aria-hidden="true" className={cn('size-5', className)} {...props} />
}
