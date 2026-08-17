import type {
  CollectionConfig,
  FieldHook,
  PayloadRequest,
  SelectFieldSingleValidation,
} from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { revalidateMenuItem, revalidateMenuItemDelete } from './MenuItems/hooks/revalidateMenuItem'

// The next free menu number = highest existing number + 1. Used both when creating a
// new item and when duplicating one (duplication would otherwise copy the existing
// number and fail the unique constraint).
const getNextMenuNumber = async (req: PayloadRequest): Promise<number> => {
  const last = await req.payload.find({
    collection: 'menu-items',
    limit: 1,
    sort: '-number',
    depth: 0,
    req,
  })

  return (last.docs[0]?.number ?? 0) + 1
}

const validateDrinkSubtype: SelectFieldSingleValidation = (value, { siblingData }) => {
  const menuItemData = siblingData as { type?: string }

  if (menuItemData.type !== 'drink') return true

  return value ? true : 'Choose a drink subtype.'
}

// Clear the stored subtype whenever the item is no longer a drink
const resetSubtypeForNonDrink: FieldHook = ({ siblingData, value }) => {
  const menuItemData = siblingData as { type?: string }

  return menuItemData.type === 'drink' ? value : null
}

// Clear bubble-tea-only fields when the item is not a bubble tea. Accepts type values and null for the field
const resetWhenNotBubbleTea =
  (fallback: unknown): FieldHook =>
  ({ siblingData, value }) => {
    const menuItemData = siblingData as { subtype?: string | null }

    return menuItemData.subtype === 'bubble-tea' ? value : fallback
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
      defaultValue: ({ req }) => getNextMenuNumber(req),
      hooks: {
        // Ved duplikering ville nummeret ellers blive kopieret og bryde unique-reglen.
        // Tildel i stedet det næste ledige nummer.
        beforeDuplicate: [({ req }) => getNextMenuNumber(req)],
      },
    },
    {
      name: 'displayNumber',
      type: 'text',
      admin: {
        description:
          'Nummeret som det står på menukortet, fx "00" eller "7a". Lad stå tomt for at bruge nummeret ovenfor.',
        position: 'sidebar',
      },
      label: 'Nummer på menukortet',
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
      hooks: {
        beforeChange: [resetSubtypeForNonDrink],
      },
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
        condition: (_, siblingData) => siblingData?.subtype !== 'bubble-tea',
      },
      required: true,
    },
    {
      type: 'row',
      admin: {
        condition: (_, siblingData) => siblingData?.subtype === 'bubble-tea',
      },
      fields: [
        {
          name: 'mediumPrice',
          type: 'number',
          min: 0,
          admin: {
            width: '50%',
            description: 'Price in kr. for Medium, for example 46.',
          },
          hooks: {
            beforeChange: [resetWhenNotBubbleTea(null)],
          },
        },
        {
          name: 'largePrice',
          type: 'number',
          min: 0,
          admin: {
            width: '50%',
            description: 'Only fill in if the drink is also sold in Large.',
          },
          hooks: {
            beforeChange: [resetWhenNotBubbleTea(null)],
          },
        },
      ],
    },
    {
      name: 'isPopular',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        condition: (_, siblingData) => siblingData?.subtype === 'bubble-tea',
      },
      label: 'Show as popular',
      hooks: {
        beforeChange: [resetWhenNotBubbleTea(false)],
      },
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
