import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { revalidateMenuItem, revalidateMenuItemDelete } from './MenuItems/hooks/revalidateMenuItem'

export const MenuItems: CollectionConfig = {
  slug: 'menu-items',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'price', 'updatedAt'],
    useAsTitle: 'name',
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
  ],
  labels: {
    plural: 'Menu Items',
    singular: 'Menu Item',
  },
  hooks: {
    afterChange: [revalidateMenuItem],
    afterDelete: [revalidateMenuItemDelete],
  },
}
