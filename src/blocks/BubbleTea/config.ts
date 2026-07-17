import type { Block } from 'payload'

export const BubbleTea: Block = {
  slug: 'bubbleTea',
  interfaceName: 'BubbleTeaBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Bubble tea',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      required: true,
    },
    {
      name: 'priceLabel',
      type: 'text',
      required: true,
      admin: {
        description: 'Short price text shown in the highlighted pill, for example “Fra 45 kr.”',
      },
    },
    {
      name: 'products',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 4,
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
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
      labels: {
        plural: 'Bubble tea products',
        singular: 'Bubble tea product',
      },
    },
  ],
  labels: {
    plural: 'Bubble Tea Sections',
    singular: 'Bubble Tea Section',
  },
}
