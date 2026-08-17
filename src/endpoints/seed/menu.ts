import type { RequiredDataFromCollectionSlug } from 'payload'

import type { Media, MenuItem } from '@/payload-types'

type MenuArgs = {
  menuImages: [Media, Media, Media, Media]
}

type MenuPageArgs = {
  bubbleTeaItems: MenuItem[]
  foodMenuItems: MenuItem[]
}

type SeedFoodItem = {
  badges?: { label: string }[]
  description: string
  highlighted?: boolean
  name: string
  price: string
}

type SeedFoodSection = {
  category: string
  heading: string
  items: SeedFoodItem[]
}

/**
 * Maden fra menukortet, i menukortets rækkefølge. Priserne følger Wolt.
 *
 * `number` i collection'en er unique og skal være >= 1, så menukortets egne
 * numre kan ikke bruges direkte (7a er ikke et tal, og bubble tea genbruger
 * 00-26). Retterne nummereres derfor fortløbende 1-19 i den rækkefølge de står
 * her, hvilket matcher kortet på nær 7a og fremefter.
 */
const foodSections: SeedFoodSection[] = [
  {
    category: 'Appetizers',
    heading: 'Forretter',
    items: [
      {
        badges: [{ label: 'Frisk' }],
        description:
          '2 stk. rispapirruller med kylling, rejer og salater. Serveres med hjemmelavet hoisin sauce og knuste jordnødder.',
        highlighted: true,
        name: 'Sommerruller (2 stk.)',
        price: '49,-',
      },
      {
        description:
          'Hjemmelavede forårsruller med kylling, rejer, grøntsager, løg og sød chilisauce.',
        name: 'Hjemmelavede forårsruller (5 stk.)',
        price: '89,-',
      },
      {
        badges: [{ label: 'Vegetar' }],
        description: 'Hjemmelavede vegetarforårsruller med grøntsagsmix.',
        name: 'Vegetar forårsruller (5 stk.)',
        price: '79,-',
      },
      {
        description: 'Tempura rejer med citron og spicy mayo.',
        name: 'Tempura rejer (6 stk.)',
        price: '89,-',
      },
      {
        description: 'Med kylling og rejer. Serveres med spicy mayo.',
        name: 'Hjemmelavede wantons (6 stk.)',
        price: '89,-',
      },
      {
        badges: [{ label: 'Vegetar' }],
        description: 'Med salt og spicy mayo.',
        name: 'Edamame bønner',
        price: '59,-',
      },
      {
        description: 'Fried dumplings med kylling og grøntsager og soya sauce.',
        name: 'Fried dumplings (6 stk.)',
        price: '79,-',
      },
      {
        badges: [{ label: 'Vegetar' }],
        description: 'Friturestegte mini vegetariske forårsruller.',
        name: 'Mini vegetar forårsruller (8 stk.)',
        price: '59,-',
      },
    ],
  },
  {
    category: 'Salads',
    heading: 'Salater',
    items: [
      {
        description: 'Salat med marineret kylling, salatmix, peanuts og spicy fiskesauce.',
        name: 'Kylling salat',
        price: '109,-',
      },
      {
        description: 'Marineret oksekød med mixed salat, peanuts og spicy fiskesauce.',
        name: 'Oksekød salat',
        price: '129,-',
      },
    ],
  },
  {
    category: 'Wok',
    heading: 'Wok retter',
    items: [
      {
        description:
          'Valgfrit protein med spicy østerssauce, sæsons grøntsager, løg og sweet basilikum. Serveres med ris.',
        name: 'Wokretter med spicy østerssauce',
        price: '139,-',
      },
      {
        description:
          'Valgfrit protein stegt i ingefær og hvidløg, østerssauce og sæsons grøntsager. Toppet med koriander og cashewnødder. Serveres med ris.',
        name: 'Wokretter med ingefær sauce',
        price: '139,-',
      },
      {
        description:
          'Tempura kylling i sur-sød sauce, grøntsager, løg, ananas og koriander. Serveres med ris.',
        name: 'Kylling i sur-sød sauce',
        price: '139,-',
      },
      {
        badges: [{ label: 'Vegetar' }],
        description:
          'Tofu stegt i hvidløg soya sauce med sæsons grøntsager, ingefær, hvidløg og koriander. Serveres med ris.',
        name: 'Stegt tofu i soya sauce',
        price: '139,-',
      },
    ],
  },
  {
    category: 'Rice & Noodles',
    heading: 'Stegte ris / nudler',
    items: [
      {
        description:
          'Stegte ris med valgfrit protein, mixed grøntsager og æg. Toppet med koriander og lime.',
        name: 'Stegte ris med østerssauce',
        price: '139,-',
      },
      {
        description:
          'Stegte nudler med valgfrit protein og spicy østerssauce, mixed grøntsager og sweet basilikum.',
        name: 'Ris nudler i spicy østerssauce',
        price: '139,-',
      },
      {
        badges: [{ label: 'Stærk' }],
        description:
          'Stegte nudler med valgfrit protein, tamarind chilisauce, fiskesauce, spidskål, æg og bønnespirer. Toppet med koriander, lime og peanuts.',
        name: 'Phad Thai nudler',
        price: '139,-',
      },
    ],
  },
  {
    category: 'Curry',
    heading: 'Vietnamesiske karry retter',
    items: [
      {
        badges: [{ label: 'Stærk' }],
        description:
          'Vietnamesisk gul karry med valgfrit protein, kokosmælk, fiskesauce, broccoli, blomkål, peberfrugt og sweet basilikum. Serveres med ris.',
        name: 'Gul karry',
        price: '139,-',
      },
      {
        badges: [{ label: 'Stærk' }],
        description:
          'Vietnamesisk rød karry med valgfrit protein, kokosmælk, fiskesauce, broccoli, blomkål, peberfrugt og sweet basilikum. Serveres med ris.',
        name: 'Rød karry',
        price: '139,-',
      },
    ],
  },
]

const foodItems = foodSections.flatMap(({ items }) => items)

/** Alle retter nummereres først, så bubble tea kan fortsætte derefter. */
const FOOD_ITEM_COUNT = foodItems.length

type BubbleTeaTier = 'premium' | 'standard'

/** Priser i kr. pr. størrelse, jf. menukortet (M 54 / L 60 og M 48 / L 55). */
const bubbleTeaPrices: Record<BubbleTeaTier, { largePrice: number; mediumPrice: number }> = {
  premium: { largePrice: 60, mediumPrice: 54 },
  standard: { largePrice: 55, mediumPrice: 48 },
}

/**
 * Alle bubble teas fra menukortet, i menukortets rækkefølge.
 * Kommentaren viser menukortets eget nummer (00-27).
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
  { description: 'Med Granat Apple Boba', name: 'Coconut Milk Tea', tier: 'standard' },
  // 11
  { description: 'Med Tapioca og mælk', name: 'Matcha Milk Tea', tier: 'standard' },
  // 12
  { description: 'Med Tapioca og mælk', name: 'Taro Milk Tea', tier: 'standard' },
  // 13
  { description: 'Med Tapioca', name: 'Caramel Milk Tea', tier: 'standard' },
  // 26
  { description: 'Med Tapioca', name: 'Brownsugar Milk Tea', tier: 'standard' },
  // 27 — kun på Wolt, ikke på det trykte menukort
  { description: 'Med Tapioca', name: 'Thai Milk Tea', tier: 'standard' },
  // 14
  { description: 'Med Apple Boba', name: 'Green Apple Ice Tea', tier: 'standard' },
  // 15
  { description: 'Med Watermelon Boba', name: 'Watermelon Ice Tea', tier: 'standard' },
  // 16
  { description: 'Med Peach Boba', name: 'Peach Ice Tea', tier: 'standard' },
  // 17
  { description: 'Med Strawberry Boba', name: 'Strawberry Ice Tea', tier: 'standard' },
  // 18
  { description: 'Med Mango Boba', name: 'Mango Ice Tea', tier: 'standard' },
  // 19
  { description: 'Med Passion Fruit Boba', name: 'Sweet Passion Fruit', tier: 'standard' },
  // 20
  { description: 'Med Lychee Boba', name: 'Lychee Ombre', tier: 'standard' },
  // 21
  { description: 'Med Kiwi Boba', name: 'Kiwi Ice Tea', tier: 'standard' },
  // 22
  { description: 'Med Honeydraw Boba', name: 'Honeydraw Ice Tea', tier: 'standard' },
  // 23
  { description: 'Med Pineapple Boba', name: 'Pineapple Ice Tea', tier: 'standard' },
  // 24
  { description: 'Med Cherry Boba', name: 'Cherry Ice Tea', tier: 'standard' },
  // 25
  { description: 'Med Lemon Boba', name: 'Lemonade Summer Cool', tier: 'standard' },
]

export const menuItems: (args: MenuArgs) => Omit<MenuItem, 'createdAt' | 'id' | 'updatedAt'>[] = ({
  menuImages,
}) => [
  ...foodItems.map(({ badges, description, highlighted, name, price }, index) => ({
    ...(badges ? { badges } : {}),
    description,
    ...(highlighted ? { highlighted } : {}),
    media: menuImages[index % menuImages.length].id,
    name,
    number: index + 1,
    price,
    type: 'food' as const,
  })),
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
    ...foodSections.map(({ category, heading, items }) => {
      const names = new Set(items.map(({ name }) => name))

      return {
        blockName: heading,
        blockType: 'menuItemGrid' as const,
        category,
        heading,
        items: foodMenuItems.filter(({ name }) => names.has(name)).map(({ id }) => id),
      }
    }),
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
