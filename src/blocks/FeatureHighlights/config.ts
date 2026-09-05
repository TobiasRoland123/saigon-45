import type { Block } from 'payload'

import { icon } from '@/fields/icon'
import { link } from '@/fields/link'

export const FeatureHighlights: Block = {
  slug: 'featureHighlights',
  interfaceName: 'FeatureHighlightsBlock',
  fields: [
    {
      name: 'addTopMargin',
      type: 'checkbox',
      admin: {
        description: 'Adds 6rem of spacing above this block.',
      },
      defaultValue: false,
      label: 'Add top margin',
    },
    {
      name: 'items',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: [
        icon({ required: true }),
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          required: true,
        },
        {
          name: 'enableLink',
          type: 'checkbox',
          defaultValue: false,
          label: 'Enable link',
        },
        link({
          appearances: false,
          disableLabel: true,
          overrides: {
            admin: {
              condition: (_data, siblingData) => Boolean(siblingData?.enableLink),
            },
          },
        }),
      ],
      labels: {
        plural: 'Highlights',
        singular: 'Highlight',
      },
      maxRows: 3,
      minRows: 1,
      required: true,
    },
  ],
  labels: {
    plural: 'Feature Highlights',
    singular: 'Feature Highlights',
  },
}
