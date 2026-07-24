import { SizeBadge } from '@/blocks/BubbleTea/SizeBadge'
import { cn } from '@/utilities/ui'
import React from 'react'

type Props = {
  className?: string
  largeLabel: string
  mediumLabel: string
}

export const SizeLegend: React.FC<Props> = ({ className, largeLabel, mediumLabel }) => (
  <div
    className={cn(
      'inline-flex shrink-0 items-center gap-4 rounded-full bg-surface-container-lowest px-5 py-3 shadow-[0_8px_18px_rgba(12,31,28,0.1)]',
      className,
    )}
  >
    <span className="inline-flex items-center gap-2 text-sm font-bold text-on-surface md:text-base">
      <SizeBadge size="medium" />
      {mediumLabel}
    </span>
    <span aria-hidden className="h-6 w-px bg-outline-variant" />
    <span className="inline-flex items-center gap-2 text-sm font-bold text-on-surface md:text-base">
      <SizeBadge size="large" />
      {largeLabel}
    </span>
  </div>
)
