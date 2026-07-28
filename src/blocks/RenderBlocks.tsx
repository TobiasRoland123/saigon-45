import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { cn } from '@/utilities/ui'
import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FeatureHighlightsBlock } from '@/blocks/FeatureHighlights/Component'
import { FindUsBlock } from '@/blocks/FindUs/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ReviewsBlock } from '@/blocks/Reviews/Component'
import { MenuHighlightsBlock } from '@/blocks/MenuHighlights/Component'
import { SideBySideContentBlock } from '@/blocks/SideBySideContent/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  featureHighlights: FeatureHighlightsBlock,
  findUs: FindUsBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  reviews: ReviewsBlock,
  menuHighlights: MenuHighlightsBlock,
  splitContent: SideBySideContentBlock,
}

// Block types that paint their own full-bleed background and can therefore sit
// flush against the footer (the footer's top border acts as the divider). Every
// other block is transparent at the section level, so when it is the last block
// on the page it needs bottom spacing to avoid kissing the footer.
const FULL_BLEED_BLOCK_TYPES = new Set<keyof typeof blockComponents>(['featureHighlights'])

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              const isLast = index === blocks.length - 1
              const needsFooterGap = isLast && !FULL_BLEED_BLOCK_TYPES.has(blockType)

              return (
                <div key={index} className={cn(needsFooterGap && 'pb-24 md:pb-32')}>
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
