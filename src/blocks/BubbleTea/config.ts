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
      name: 'items',
      type: 'relationship',
      relationTo: 'menu-items',
      hasMany: true,
      required: true,
      minRows: 1,
      maxRows: 4,
      admin: {
        description: 'Select up to four drink menu items to show in this section.',
      },
      filterOptions: {
        type: {
          equals: 'drink',
        },
      },
      label: 'Drink menu items',
    },
  ],
  labels: {
    plural: 'Bubble Tea Sections',
    singular: 'Bubble Tea Section',
  },
}
