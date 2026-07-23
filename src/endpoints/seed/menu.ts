import type { RequiredDataFromCollectionSlug } from 'payload'

import type { Media, MenuItem } from '@/payload-types'

type MenuArgs = {
  menuImages: [Media, Media, Media, Media]
}

export const menuItems: (args: MenuArgs) => Omit<MenuItem, 'createdAt' | 'id' | 'updatedAt'>[] = ({
  menuImages,
}) => [
  {
    badges: [{ label: 'Frisk' }, { label: 'Glutenfri option' }],
    description:
      '2 stk. rispapirruller med kylling, rejer og salater. Serveres med hjemmelavet hoisin sauce og knuste jordnødder.',
    highlighted: true,
    media: menuImages[0].id,
    name: 'Sommerruller',
    number: 1,
    price: '49,-',
  },
  {
    description: '5 stk. med kylling, rejer og grøntsager. Serveres med sød chilisauce.',
    media: menuImages[1].id,
    name: 'Forårsruller',
    number: 2,
    price: '79,-',
  },
  {
    badges: [{ label: 'Vegansk' }],
    description: '5 stk. fyldt med grøntsager og glasnudler. Serveres med vegetar-sauce.',
    media: menuImages[2].id,
    name: 'Vegetar ruller',
    number: 3,
    price: '69,-',
  },
  {
    description: '6 stk. sprøde rejer serveret med chili mayo.',
    media: menuImages[3].id,
    name: 'Tempura rejer',
    number: 4,
    price: '79,-',
  },
  {
    description: '6 stk. fyldt med kylling og rejer. Serveres med sød chilisauce.',
    media: menuImages[0].id,
    name: 'Sprøde wantons',
    number: 5,
    price: '79,-',
  },
  {
    description: '6 dampede dumplings med saftig kylling, ingefær og forårsløg.',
    media: menuImages[1].id,
    name: 'Gyoza med kylling',
    number: 6,
    price: '69,-',
  },
  {
    badges: [{ label: 'Stærk' }],
    description: 'Sprøde kyllingespyd med satay-sauce og et strejf af chili.',
    media: menuImages[2].id,
    name: 'Satay kylling',
    number: 7,
    price: '75,-',
  },
  {
    description: 'Sprøde grøntsager og svampe i en let tempuradej med dip.',
    media: menuImages[3].id,
    name: 'Tempura grøntsager',
    number: 8,
    price: '59,-',
  },
]

export const menu: (args: { menuItems: MenuItem[] }) => RequiredDataFromCollectionSlug<'pages'> = ({
  menuItems,
}) => ({
  _status: 'published',
  hero: {
    type: 'none',
  },
  layout: [
    {
      blockName: 'Forretter',
      blockType: 'menuItemGrid',
      category: 'Appetizers',
      heading: 'Forretter',
      items: menuItems.map(({ id }) => id),
    },
  ],
  slug: 'menu',
  title: 'Menu',
})
