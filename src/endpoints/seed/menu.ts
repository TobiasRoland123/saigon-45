import type { RequiredDataFromCollectionSlug } from 'payload'

import type { Media, MenuItem } from '@/payload-types'

type MenuArgs = {
  menuImages: [Media, Media, Media, Media]
}

type MenuPageArgs = {
  bubbleTeaItems: MenuItem[]
  foodMenuItems: MenuItem[]
}

/** Antal food-items nedenfor. Bubble tea nummereres videre herfra. */
const FOOD_ITEM_COUNT = 8

type BubbleTeaTier = 'premium' | 'standard'

/** Priser i kr. pr. størrelse, jf. menukortet (M 54 / L 60 og M 48 / L 55). */
const bubbleTeaPrices: Record<BubbleTeaTier, { largePrice: number; mediumPrice: number }> = {
  premium: { largePrice: 60, mediumPrice: 54 },
  standard: { largePrice: 55, mediumPrice: 48 },
}

/**
 * Alle bubble teas fra menukortet, i menukortets rækkefølge.
 * Kommentaren viser menukortets eget nummer (00-26).
 */
const bubbleTeas: {
  description: string
  isPopular?: boolean
  name: string
  tier: BubbleTeaTier
}[] = [
  // 00
  {
    description: 'Med Tapioca og kokosnød creme',
    isPopular: true,
    name: 'SÀI GON Special',
    tier: 'premium',
  },
  // 01
  { description: 'Med Tapioca og cream cheese', name: 'Brownsugar Cream Cheese', tier: 'premium' },
  // 02
  { description: 'Med Cherry Boba og kokosnød creme', name: 'Creamy Rainbow', tier: 'premium' },
  // 04
  { description: 'Med flødeskum og brownsugar', name: 'Oreo Drink', tier: 'premium' },
  // 05
  { description: 'Med Tapioca og coffee cream', name: 'SÀI GON Coffee', tier: 'premium' },
  // 03
  { description: 'Med Cherry Boba og vandmelon-sirup', name: 'Blue Sky', tier: 'standard' },
  // 06
  { description: 'Med Strawberry Boba', name: 'Strawberry Milk Tea', tier: 'standard' },
  // 07
  { description: 'Med Mango Boba', name: 'Mango Milk Tea', tier: 'standard' },
  // 08
  { description: 'Med Blueberry Boba', name: 'Blueberry Milk Tea', tier: 'standard' },
  // 09
  { description: 'Med Tapioca', name: 'Pearls Milk Tea', tier: 'standard' },
  // 10
  { description: 'Med Grante Apple Boba', name: 'Coconut Milk Tea', tier: 'standard' },
  // 11
  { description: 'Med Tapioca og mælk', name: 'Matcha Milk Tea', tier: 'standard' },
  // 12
  { description: 'Med Tapioca og mælk', name: 'Taro Milk Tea', tier: 'standard' },
  // 13
  { description: 'Med Tapioca', name: 'Caramel Milk Tea', tier: 'standard' },
  // 26
  { description: 'Med Tapioca', name: 'Brownsugar Milk Tea', tier: 'standard' },
  // 14
  { description: 'Med Apple Boba', name: 'Apple Ice Tea', tier: 'standard' },
  // 15
  { description: 'Med Watermelon Boba', name: 'Watermelon Ice Tea', tier: 'standard' },
  // 16
  { description: 'Med Peach Boba', name: 'Peach Ice Tea', tier: 'standard' },
  // 17
  { description: 'Med Strawberry Boba', name: 'Strawberry Ice Tea', tier: 'standard' },
  // 18
  { description: 'Med Mango Boba', name: 'Mango Ice Tea', tier: 'standard' },
  // 19
  { description: 'Med Passionfruit Boba', name: 'Sweet Passionfruit', tier: 'standard' },
  // 20
  { description: 'Med Lychee Boba', name: 'Lychee Ombre', tier: 'standard' },
  // 21
  { description: 'Med Kiwi Boba', name: 'Kiwi Ice Tea', tier: 'standard' },
  // 22
  { description: 'Med Honeydrew Boba', name: 'Honeydrew Ice Tea', tier: 'standard' },
  // 23
  { description: 'Med Pinaapple Boba', name: 'Pinaapple Ice Tea', tier: 'standard' },
  // 24
  { description: 'Med Cherry Boba', name: 'Cherry Ice Tea', tier: 'standard' },
  // 25
  { description: 'Med Lemon Boba', name: 'Lemonade Summer Cool', tier: 'standard' },
]

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
  // `number` er unique på tværs af hele menuen og skal være >= 1, så bubble tea
  // fortsætter nummereringen efter forretterne i stedet for at bruge menukortets
  // egne numre (00-26). Menukortets nummer står som kommentar i `bubbleTeas`.
  ...bubbleTeas.map(({ description, isPopular, name, tier }, index) => {
    const { largePrice, mediumPrice } = bubbleTeaPrices[tier]

    return {
      description,
      media: menuImages[index % menuImages.length].id,
      name,
      number: FOOD_ITEM_COUNT + 1 + index,
      price: `${mediumPrice},-`,
      mediumPrice,
      largePrice,
      ...(isPopular ? { isPopular } : {}),
      subtype: 'bubble-tea' as const,
      type: 'drink' as const,
    }
  }),
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
      mode: 'full',
      heading: 'Find din bubble tea-favorit',
      subtitle:
        'Vælg mellem frugtige, cremede og klassiske varianter – altid frisklavet med dine yndlingstoppings.',
      sizeLegend: { mediumLabel: 'Medium', largeLabel: 'Large' },
      popularLabel: 'Populær',
      items: bubbleTeaItems.map(({ id }) => id),
      toppings: {
        heading: 'Ekstra Toppings',
        priceLabel: '+5 kr pr. ske',
        items: [
          { label: 'Tapioca Pearls' },
          { label: 'Hantian Pearls' },
          { label: 'Strawberry Boba' },
          { label: 'Mango Boba' },
          { label: 'Blueberry Boba' },
          { label: 'Passionsfruit Boba' },
          { label: 'Lychee Boba' },
          { label: 'Green Apple Boba' },
          { label: 'Peach Boba' },
          { label: 'Cream Cheese' },
        ],
      },
    },
  ],
  slug: 'menu',
  title: 'Menu',
})
