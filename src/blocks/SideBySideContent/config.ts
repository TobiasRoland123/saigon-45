import type { Block } from 'payload'

import { link } from '@/fields/link'

export const SideBySideContent: Block = {
  slug: 'splitContent',
  interfaceName: 'SideBySideContentBlock',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'features',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
      labels: {
        plural: 'Features',
        singular: 'Feature',
      },
      maxRows: 4,
      minRows: 1,
      required: true,
    },
    link({
      appearances: ['default'],
      overrides: {
        name: 'primaryLink',
        label: 'Primary link',
      },
    }),
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'imageCallout',
      type: 'text',
      required: true,
    },
  ],
  labels: {
    plural: 'Side-by-Side Content Sections',
    singular: 'Side-by-Side Content Section',
  },
}
