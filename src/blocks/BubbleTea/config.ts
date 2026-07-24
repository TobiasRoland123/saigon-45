import type { Block } from 'payload'

import { link } from '@/fields/link'

export const BubbleTea: Block = {
  slug: 'bubbleTea',
  interfaceName: 'BubbleTeaBlock',
  fields: [
    {
      name: 'mode',
      type: 'select',
      required: true,
      defaultValue: 'highlight',
      options: [
        {
          label: 'Highlight – fremhæv 4 udvalgte varianter med en “se alle”-knap',
          value: 'highlight',
        },
        {
          label: 'Vis alle – viser automatisk alle bubble teas',
          value: 'full',
        },
      ],
      admin: {
        description:
          'Highlight: vælg 4 varianter der fremhæves, plus en knap til den fulde liste. Vis alle: viser automatisk alle bubble teas fra menukortet og hele toppingslisten.',
      },
    },
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
    // "Se alle varianter"-knappen. Bruger repoets link()-felt, så editor kan vælge
    // enten en intern side (pages/posts) eller en custom URL.
    link({
      appearances: false,
      overrides: {
        name: 'viewAll',
        label: 'Knap: Se alle varianter',
        admin: {
          condition: (_, siblingData) => siblingData?.mode === 'highlight',
          description:
            'Vises kun i highlight. Vælg intern side eller custom URL (fx /menu#bubble-tea).',
        },
      },
    }),
    {
      name: 'sizeLegend',
      type: 'group',
      admin: {
        description: 'Explains what the “M” and “L” badges on each product mean.',
      },
      fields: [
        {
          name: 'mediumLabel',
          type: 'text',
          required: true,
          defaultValue: 'Medium',
        },
        {
          name: 'largeLabel',
          type: 'text',
          required: true,
          defaultValue: 'Large',
        },
      ],
    },
    {
      name: 'popularLabel',
      type: 'text',
      required: true,
      defaultValue: 'Populær',
      admin: {
        description: 'Badge text shown on every product marked as popular.',
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
        condition: (_, siblingData) => siblingData?.mode === 'highlight',
        description: 'Vælg op til 4 bubble tea-varianter der skal fremhæves i denne sektion.',
      },
      filterOptions: {
        subtype: {
          equals: 'bubble-tea',
        },
        type: {
          equals: 'drink',
        },
      },
    },
    {
      name: 'toppings',
      type: 'group',
      admin: {
        description: 'Teksten om ekstra toppings. Den fulde liste vises kun i “vis alle”.',
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          defaultValue: 'Ekstra Toppings',
          admin: {
            condition: (_, __, { blockData }) => blockData?.mode === 'full',
            description: 'Overskrift på den fulde toppings-liste (kun i “vis alle”).',
          },
        },
        {
          name: 'priceLabel',
          type: 'text',
          required: true,
          defaultValue: '+4 kr pr. stk.',
          admin: {
            description: 'Kort prislabel der vises i pillen i begge tilstande.',
          },
        },
        {
          name: 'items',
          type: 'array',
          admin: {
            condition: (_, __, { blockData }) => blockData?.mode === 'full',
            initCollapsed: true,
            description: 'Toppings der vises i den fulde liste (kun i “vis alle”).',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
          ],
          labels: {
            plural: 'Toppings',
            singular: 'Topping',
          },
        },
      ],
    },
  ],
  labels: {
    plural: 'Bubble Tea Sections',
    singular: 'Bubble Tea Section',
  },
}
