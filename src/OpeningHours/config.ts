import type { GlobalConfig, TextFieldSingleValidation } from 'payload'

import { revalidateOpeningHours } from './hooks/revalidateOpeningHours'

// Values match JavaScript's Date.getDay() so the frontend can look a day up directly:
// 0 = Sunday ... 6 = Saturday.
const dayOptions = [
  { label: 'Mandag', value: '1' },
  { label: 'Tirsdag', value: '2' },
  { label: 'Onsdag', value: '3' },
  { label: 'Torsdag', value: '4' },
  { label: 'Fredag', value: '5' },
  { label: 'Lørdag', value: '6' },
  { label: 'Søndag', value: '0' },
]

// Seed one row per weekday so editors just fill in times instead of adding rows.
const defaultDays = dayOptions.map(({ value }) => ({
  day: value,
  closed: false,
  opensAt: '11:00',
  closesAt: '21:00',
}))

// Accepts an empty string (field not required) or a 24h "HH:mm" value.
const validateTime: TextFieldSingleValidation = (value) => {
  if (!value) return true
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value) || 'Use 24-hour HH:mm format, e.g. 20:00'
}

export const OpeningHours: GlobalConfig = {
  slug: 'opening-hours',
  label: 'Opening Hours',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'address',
      type: 'text',
      required: true,
      admin: {
        description: 'Shown on the left of the opening-hours pill, e.g. "Rødovre Centrum 41".',
      },
    },
    {
      name: 'addressUrl',
      type: 'text',
      required: true,
      admin: {
        description: 'Link to adress on Google Maps, e.g. "https://goo.gl/maps/..."',
      },
    },
    {
      name: 'days',
      type: 'array',
      label: 'Weekly hours',
      defaultValue: defaultDays,
      maxRows: 7,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/OpeningHours/RowLabel#RowLabel',
        },
        description:
          'One row per day. Tick "Closed" for days you are shut. For hours past midnight (e.g. open until 02:00) just set the closing time — it is treated as the next morning.',
      },
      fields: [
        {
          name: 'day',
          type: 'select',
          required: true,
          options: dayOptions,
        },
        {
          name: 'closed',
          type: 'checkbox',
          defaultValue: false,
          label: 'Closed all day',
        },
        {
          type: 'row',
          fields: [
            {
              name: 'opensAt',
              type: 'text',
              label: 'Opens at',
              validate: validateTime,
              admin: {
                placeholder: '10:00',
                width: '50%',
                condition: (_, siblingData) => !siblingData?.closed,
              },
            },
            {
              name: 'closesAt',
              type: 'text',
              label: 'Closes at',
              validate: validateTime,
              admin: {
                placeholder: '20:00',
                width: '50%',
                condition: (_, siblingData) => !siblingData?.closed,
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateOpeningHours],
  },
  versions: false,
}
