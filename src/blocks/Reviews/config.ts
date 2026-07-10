import type { Block } from 'payload'
import { icon } from '@/fields/icon'

export const Reviews: Block = {
  slug: 'reviews',
  interfaceName: 'ReviewsBlock',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Kvalitet du kan smage',
      required: true,
    },
    {
      name: 'ratingLabel',
      type: 'text',
      defaultValue: '4.5+ Stjerner på Google',
      required: true,
    },
    {
      name: 'ratingDescription',
      type: 'textarea',
      defaultValue: 'Vores gæster elsker vores mad og hurtige service.',
      required: true,
    },
    icon({
      name: 'ratingIcon',
      label: 'Rating icon',
      required: true,
      overrides: { defaultValue: 'star' },
    }),
    {
      name: 'smileyTitle',
      type: 'text',
      defaultValue: 'Elite Smiley',
      required: true,
    },
    icon({
      name: 'smileyIcon',
      label: 'Smiley icon',
      required: true,
      overrides: { defaultValue: 'badgeCheck' },
    }),
    {
      name: 'smileyLinkLabel',
      type: 'text',
      defaultValue: 'Se vores seneste Smiley-rapport her.',
      required: true,
    },
    {
      name: 'smileyLinkUrl',
      type: 'text',
      admin: {
        description: 'Optional URL for the Smiley report link.',
      },
    },
    {
      name: 'reviews',
      type: 'array',
      admin: {
        initCollapsed: true,
        description: 'Add multiple reviews to create the interactive swipeable review stack.',
      },
      defaultValue: [
        {
          name: 'Thomas Berg',
          quote: 'Fantastisk gyoza! Prøv dem som snack til din bubble tea.',
          rating: 5,
          source: 'Google Review',
        },
        {
          name: 'Sofie Nielsen',
          quote: 'Virkelig lækker bubble tea og superhurtig service. Jeg kommer helt sikkert igen.',
          rating: 5,
          source: 'Google Review',
        },
        {
          name: 'Mikkel Andersen',
          quote: 'Gode smage, friske toppings og en hyggelig stemning. Kan varmt anbefales.',
          rating: 4,
          source: 'Google Review',
        },
      ],
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'source',
          type: 'text',
          defaultValue: 'Google Review',
          required: true,
        },
        {
          name: 'rating',
          type: 'number',
          defaultValue: 5,
          max: 5,
          min: 1,
          required: true,
        },
      ],
      labels: {
        plural: 'Reviews',
        singular: 'Review',
      },
      minRows: 1,
      required: true,
    },
  ],
  labels: {
    plural: 'Reviews Sections',
    singular: 'Reviews Section',
  },
}
