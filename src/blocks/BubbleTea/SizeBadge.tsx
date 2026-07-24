import { cn } from '@/utilities/ui'
import React from 'react'

export type BubbleTeaSize = 'large' | 'medium'

const sizeStyles: Record<BubbleTeaSize, string> = {
  large: 'bg-secondary-container text-on-secondary-container',
  medium: 'bg-primary text-primary-foreground',
}

const sizeLetters: Record<BubbleTeaSize, string> = {
  large: 'L',
  medium: 'M',
}

type Props = {
  className?: string
  size: BubbleTeaSize
}

export const SizeBadge: React.FC<Props> = ({ className, size }) => (
  <span
    aria-hidden
    className={cn(
      'inline-flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-extrabold',
      sizeStyles[size],
      className,
    )}
  >
    {sizeLetters[size]}
  </span>
)
