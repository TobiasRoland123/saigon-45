import type { RequiredDataFromCollectionSlug } from 'payload'

import type { Media } from '@/payload-types'

type MenuArgs = {
  menuImages: [Media, Media, Media, Media]
}

const orderLink = {
  label: 'Bestil',
  newTab: true,
  type: 'custom' as const,
  url: 'https://wolt.com/da/dnk/copenhagen/restaurant/saigon-45',
}

export const menu: (args: MenuArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  menuImages,
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
      items: [
        {
          badges: [{ label: 'Frisk' }, { label: 'Glutenfri option' }],
          description:
            '2 stk. rispapirruller med kylling, rejer og salater. Serveres med hjemmelavet hoisin sauce og knuste jordnødder.',
          highlighted: true,
          link: orderLink,
          media: menuImages[0].id,
          name: '1. Sommerruller',
          price: '49,-',
        },
        {
          description: '5 stk. med kylling, rejer og grøntsager. Serveres med sød chilisauce.',
          link: orderLink,
          media: menuImages[1].id,
          name: '2. Forårsruller',
          price: '79,-',
        },
        {
          badges: [{ label: 'Vegansk' }],
          description: '5 stk. fyldt med grøntsager og glasnudler. Serveres med vegetar-sauce.',
          link: orderLink,
          media: menuImages[2].id,
          name: '3. Vegetar ruller',
          price: '69,-',
        },
        {
          description: '6 stk. sprøde rejer serveret med chili mayo.',
          link: orderLink,
          media: menuImages[3].id,
          name: '4. Tempura rejer',
          price: '79,-',
        },
        {
          description: '6 stk. fyldt med kylling og rejer. Serveres med sød chilisauce.',
          link: orderLink,
          media: menuImages[0].id,
          name: '5. Sprøde wantons',
          price: '79,-',
        },
        {
          description: '6 dampede dumplings med saftig kylling, ingefær og forårsløg.',
          link: orderLink,
          media: menuImages[1].id,
          name: '6. Gyoza med kylling',
          price: '69,-',
        },
        {
          badges: [{ label: 'Stærk' }],
          description: 'Sprøde kyllingespyd med satay-sauce og et strejf af chili.',
          link: orderLink,
          media: menuImages[2].id,
          name: '7. Satay kylling',
          price: '75,-',
        },
        {
          description: 'Sprøde grøntsager og svampe i en let tempuradej med dip.',
          link: orderLink,
          media: menuImages[3].id,
          name: '8. Tempura grøntsager',
          price: '59,-',
        },
      ],
    },
    {
      blockName: 'Bubble tea-favoritter',
      blockType: 'bubbleTea',
      heading: 'Find din bubble tea-favorit',
      subtitle:
        'Vælg mellem frugtige, cremede og klassiske varianter – altid frisklavet med dine yndlingstoppings.',
      priceLabel: 'Fra 45 kr.',
      products: [
        { media: menuImages[0].id, name: 'Classic Milk Tea' },
        { media: menuImages[1].id, name: 'Mango Passion' },
        { media: menuImages[2].id, name: 'Strawberry Matcha' },
      ],
    },
  ],
  slug: 'menu',
  title: 'Menu',
})
