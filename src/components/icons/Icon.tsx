import type { SVGProps } from 'react'

import { cn } from '@/utilities/ui'
import { iconRegistry, type IconName } from './registry'

type DecorativeIconProps = {
  name: IconName
  label?: never
} & Omit<SVGProps<SVGSVGElement>, 'aria-hidden' | 'role'>

type MeaningfulIconProps = {
  name: IconName
  label: string
} & Omit<SVGProps<SVGSVGElement>, 'aria-label' | 'aria-hidden' | 'role'>

export type IconProps = DecorativeIconProps | MeaningfulIconProps

export const Icon: React.FC<IconProps> = ({ className, label, name, ...props }) => {
  const IconComponent = iconRegistry[name].Icon

  if (label) {
    return (
      <IconComponent aria-label={label} className={cn('size-5', className)} role="img" {...props} />
    )
  }

  return <IconComponent aria-hidden="true" className={cn('size-5', className)} {...props} />
}
