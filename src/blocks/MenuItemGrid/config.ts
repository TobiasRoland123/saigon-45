import type { Block } from 'payload'

import { link } from '@/fields/link'

export const MenuItemGrid: Block = {
  slug: 'menuItemGrid',
  interfaceName: 'MenuItemGridBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Menu',
      required: true,
    },
    {
      name: 'category',
      type: 'text',
      admin: {
        description: 'Category label shown alongside the heading.',
      },
    },
    {
      name: 'items',
      type: 'array',
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
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'price',
          type: 'text',
          admin: {
            description: 'For example: 49,-',
          },
          required: true,
        },
        {
          name: 'highlighted',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Display this menu item with the highlighted card layout.',
          },
          label: 'Highlight menu item',
        },
        {
          name: 'badges',
          type: 'array',
          admin: {
            description: 'Optional dietary or promotional labels.',
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
            plural: 'Badges',
            singular: 'Badge',
          },
        },
        link({
          appearances: false,
          overrides: {
            admin: {
              description: 'Optional destination for the menu item.',
            },
            label: 'CTA',
          },
        }),
      ],
      labels: {
        plural: 'Menu items',
        singular: 'Menu item',
      },
      minRows: 1,
      required: true,
    },
  ],
  labels: {
    plural: 'Menu Item Grids',
    singular: 'Menu Item Grid',
  },
}
