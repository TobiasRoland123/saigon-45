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
    defaultColumns: ['number', 'name', 'price', 'updatedAt'],
    useAsTitle: 'name',
  },
  defaultSort: 'number',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'number',
      type: 'number',
      required: true,
      unique: true,
      min: 1,
      admin: {
        description: 'Rettens nummer på menukortet. Foreslås automatisk ud fra det højeste nummer.',
        position: 'sidebar',
      },
      // Kører serverside når "Create New"-formularen åbnes
      defaultValue: async ({ req }) => {
        const last = await req.payload.find({
          collection: 'menu-items',
          limit: 1,
          sort: '-number',
          depth: 0,
          req,
        })
        return (last.docs[0]?.number ?? 0) + 1
      },
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
