import type { Field, GlobalConfig, TextFieldSingleValidation } from 'payload'

import { revalidateOpeningHours } from './hooks/revalidateOpeningHours'

// Requires a 24h "HH:mm" value whenever the day is not marked closed.
const validateTime: TextFieldSingleValidation = (value, { siblingData }) => {
  if ((siblingData as { closed?: boolean })?.closed) return true
  if (!value) return 'Required unless the day is marked "Closed all day"'
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value) || 'Use 24-hour HH:mm format, e.g. 20:00'
}

// One fixed group per weekday: the week is always complete, no missing or
// duplicate days. `name` is the stable code-facing key; `label` is what
// editors see and what the frontend prints (e.g. "Mandag").
const dayField = (name: string, defaultLabel: string): Field => ({
  name,
  type: 'group',
  label: defaultLabel,
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      defaultValue: defaultLabel,
      admin: {
        description: 'Day name shown to visitors, e.g. "Mandag".',
      },
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
          defaultValue: '11:00',
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
          defaultValue: '21:00',
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
})

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
      type: 'group',
      label: 'Weekly hours',
      admin: {
        description:
          'Tick "Closed" for days you are shut. For hours past midnight (e.g. open until 02:00) just set the closing time — it is treated as the next morning.',
      },
      fields: [
        dayField('monday', 'Mandag'),
        dayField('tuesday', 'Tirsdag'),
        dayField('wednesday', 'Onsdag'),
        dayField('thursday', 'Torsdag'),
        dayField('friday', 'Fredag'),
        dayField('saturday', 'Lørdag'),
        dayField('sunday', 'Søndag'),
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateOpeningHours],
  },
  versions: false,
}
