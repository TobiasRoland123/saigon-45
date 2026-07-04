import type { Block } from 'payload'

import { icon } from '@/fields/icon'

export const FeatureHighlights: Block = {
  slug: 'featureHighlights',
  interfaceName: 'FeatureHighlightsBlock',
  fields: [
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
