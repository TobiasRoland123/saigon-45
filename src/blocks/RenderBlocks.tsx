import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContactBlock } from '@/blocks/Contact/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FeatureHighlightsBlock } from '@/blocks/FeatureHighlights/Component'
import { FindUsBlock } from '@/blocks/FindUs/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { MenuItemGridBlock } from '@/blocks/MenuItemGrid/Component'
import { ReviewsBlock } from '@/blocks/Reviews/Component'
import { MenuHighlightsBlock } from '@/blocks/MenuHighlights/Component'
import { SideBySideContentBlock } from '@/blocks/SideBySideContent/Component'
import { BubbleTeaBlock } from '@/blocks/BubbleTea/Component'
import { cn } from '@/utilities/ui'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  contact: ContactBlock,
  cta: CallToActionBlock,
  featureHighlights: FeatureHighlightsBlock,
  findUs: FindUsBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  menuItemGrid: MenuItemGridBlock,
  reviews: ReviewsBlock,
  menuHighlights: MenuHighlightsBlock,
  splitContent: SideBySideContentBlock,
  bubbleTea: BubbleTeaBlock,
}

const getBlockWrapperClassName = (index: number, removeFirstBlockMargin: boolean) =>
  cn(index === 0 && removeFirstBlockMargin && '[&>section]:mt-0')

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
  removeFirstBlockMargin?: boolean
}> = (props) => {
  const { blocks, removeFirstBlockMargin = false } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div
                  className={getBlockWrapperClassName(index, removeFirstBlockMargin)}
                  key={index}
                >
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
