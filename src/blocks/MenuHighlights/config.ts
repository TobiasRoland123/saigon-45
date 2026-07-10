import type { Block } from 'payload'

import { link } from '@/fields/link'

export const MenuHighlights: Block = {
  slug: 'menuHighlights',
  interfaceName: 'MenuHighlightsBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Hvad har du lyst til?',
    },
    {
      name: 'intro',
      type: 'textarea',
    },
    {
      name: 'cards',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 3,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'imageLabel',
          type: 'text',
          admin: {
            description: 'Optional label shown over the image.',
          },
        },
        {
          name: 'badge',
          type: 'text',
          admin: {
            description: 'Optional badge shown in the top-right corner.',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        link({
          appearances: false,
          overrides: {
            label: 'CTA',
          },
        }),
      ],
    },
  ],
  labels: {
    plural: 'Menu Highlights',
    singular: 'Menu Highlight',
  },
}
