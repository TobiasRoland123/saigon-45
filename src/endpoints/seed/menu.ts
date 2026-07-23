import type { RequiredDataFromCollectionSlug } from 'payload'

import type { Media, MenuItem } from '@/payload-types'

type MenuArgs = {
  menuImages: [Media, Media, Media, Media]
}

type MenuPageArgs = {
  bubbleTeaItems: MenuItem[]
  foodMenuItems: MenuItem[]
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
    type: 'food',
  },
  {
    description: '5 stk. med kylling, rejer og grøntsager. Serveres med sød chilisauce.',
    media: menuImages[1].id,
    name: 'Forårsruller',
    number: 2,
    price: '79,-',
    type: 'food',
  },
  {
    badges: [{ label: 'Vegansk' }],
    description: '5 stk. fyldt med grøntsager og glasnudler. Serveres med vegetar-sauce.',
    media: menuImages[2].id,
    name: 'Vegetar ruller',
    number: 3,
    price: '69,-',
    type: 'food',
  },
  {
    description: '6 stk. sprøde rejer serveret med chili mayo.',
    media: menuImages[3].id,
    name: 'Tempura rejer',
    number: 4,
    price: '79,-',
    type: 'food',
  },
  {
    description: '6 stk. fyldt med kylling og rejer. Serveres med sød chilisauce.',
    media: menuImages[0].id,
    name: 'Sprøde wantons',
    number: 5,
    price: '79,-',
    type: 'food',
  },
  {
    description: '6 dampede dumplings med saftig kylling, ingefær og forårsløg.',
    media: menuImages[1].id,
    name: 'Gyoza med kylling',
    number: 6,
    price: '69,-',
    type: 'food',
  },
  {
    badges: [{ label: 'Stærk' }],
    description: 'Sprøde kyllingespyd med satay-sauce og et strejf af chili.',
    media: menuImages[2].id,
    name: 'Satay kylling',
    number: 7,
    price: '75,-',
    type: 'food',
  },
  {
    description: 'Sprøde grøntsager og svampe i en let tempuradej med dip.',
    media: menuImages[3].id,
    name: 'Tempura grøntsager',
    number: 8,
    price: '59,-',
    type: 'food',
  },
  {
    description: 'Klassisk sort te med mælk, brun sukker-sirup og tapiokaperler.',
    media: menuImages[0].id,
    name: 'Classic Milk Tea',
    number: 9,
    price: '45,-',
    subtype: 'bubble-tea',
    type: 'drink',
  },
  {
    description: 'Frugtig mango- og passionsfrugt-te med tapiokaperler.',
    media: menuImages[1].id,
    name: 'Mango Passion',
    number: 10,
    price: '49,-',
    subtype: 'bubble-tea',
    type: 'drink',
  },
  {
    description: 'Cremet matcha med jordbærpuré, mælk og tapiokaperler.',
    media: menuImages[2].id,
    name: 'Strawberry Matcha',
    number: 11,
    price: '52,-',
    subtype: 'bubble-tea',
    type: 'drink',
  },
]

export const menu: (args: MenuPageArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  bubbleTeaItems,
  foodMenuItems,
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
      items: foodMenuItems.map(({ id }) => id),
    },
    {
      blockName: 'Bubble tea-favoritter',
      blockType: 'bubbleTea',
      heading: 'Find din bubble tea-favorit',
      subtitle:
        'Vælg mellem frugtige, cremede og klassiske varianter – altid frisklavet med dine yndlingstoppings.',
      priceLabel: 'Fra 45 kr.',
      items: bubbleTeaItems.map(({ id }) => id),
    },
  ],
  slug: 'menu',
  title: 'Menu',
})
