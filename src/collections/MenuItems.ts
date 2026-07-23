import type { CollectionConfig, SelectFieldSingleValidation } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { revalidateMenuItem, revalidateMenuItemDelete } from './MenuItems/hooks/revalidateMenuItem'

const validateDrinkSubtype: SelectFieldSingleValidation = (value, { siblingData }) => {
  const menuItemData = siblingData as { type?: string }

  if (menuItemData.type !== 'drink') return true

  return value ? true : 'Choose a drink subtype.'
}

export const MenuItems: CollectionConfig = {
  slug: 'menu-items',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['number', 'name', 'type', 'price', 'updatedAt'],
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
      name: 'type',
      type: 'select',
      admin: {
        description: 'Choose whether this menu item is food, a drink, or a dessert.',
        position: 'sidebar',
      },
      options: [
        {
          label: 'Food',
          value: 'food',
        },
        {
          label: 'Drink',
          value: 'drink',
        },
        {
          label: 'Dessert',
          value: 'dessert',
        },
      ],
      required: true,
    },
    {
      name: 'subtype',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'drink',
        description: 'Choose the drink subtype.',
        position: 'sidebar',
      },
      label: 'Drink subtype',
      options: [
        {
          label: 'Bubble Tea',
          value: 'bubble-tea',
        },
      ],
      validate: validateDrinkSubtype,
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
