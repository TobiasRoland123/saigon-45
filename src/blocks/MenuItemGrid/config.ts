import type { Block } from 'payload'

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
      type: 'relationship',
      admin: {
        description:
          'Select the menu items to show in this section and arrange their display order.',
      },
      hasMany: true,
      label: 'Menu items',
      minRows: 1,
      relationTo: 'menu-items',
      required: true,
    },
  ],
  labels: {
    plural: 'Menu Item Grids',
    singular: 'Menu Item Grid',
  },
}
