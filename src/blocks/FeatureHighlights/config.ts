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
      defaultValue: [
        {
          icon: 'star',
          title: '4.5+ Stjerner på Google',
          subtitle: 'Baseret på 500+ anmeldelser',
        },
        {
          icon: 'badgeCheck',
          title: 'Elite Smiley',
          subtitle: 'Højeste fødevaresikkerhed',
        },
        {
          icon: 'leaf',
          title: 'Friske Råvarer',
          subtitle: 'Kvalitet i hver servering',
        },
      ],
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
