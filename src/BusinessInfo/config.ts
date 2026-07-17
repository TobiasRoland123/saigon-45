import type { Field, GlobalConfig, TextFieldSingleValidation } from 'payload'

import { socialPlatformOptions } from '@/components/icons/socialIconRegistry'
import { validatePhoneNumber } from '@/utilities/validatePhoneNumber'
import { revalidateBusinessInfo } from './hooks/revalidateBusinessInfo'

// Requires a 24h "HH:mm" value whenever the day is not marked closed.
const validateTime: TextFieldSingleValidation = (value, { siblingData }) => {
  if ((siblingData as { closed?: boolean })?.closed) return true
  if (!value) return 'Required unless the day is marked "Closed all day"'
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value) || 'Use 24-hour HH:mm format, e.g. 20:00'
}

// Delegates to the shared phone validator, surfacing its error message.
const validatePhone: TextFieldSingleValidation = (value) => {
  const result = validatePhoneNumber(value ?? '')
  return result.valid ? true : (result.error ?? 'Ugyldigt telefonnummer')
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
})

// Single source of truth for the shop's static facts — address, contact,
// weekly opening hours and social links. Consumed by the hero pill and the
// Find Us block, and editable at /admin under Settings → Business Info.
export const BusinessInfo: GlobalConfig = {
  slug: 'business-info',
  label: 'Business Info',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'address',
      type: 'group',
      fields: [
        {
          name: 'street',
          type: 'text',
          required: true,
          admin: {
            description: 'Street and number, e.g. "Rødovre Centrum 45".',
          },
        },
        {
          name: 'zipCity',
          type: 'text',
          required: true,
          admin: {
            description: 'Postal code and city, e.g. "2610 Rødovre".',
          },
        },
        {
          name: 'extraDetails',
          type: 'text',
          admin: {
            description: 'Optional extra line, e.g. "(Find os i stueetagen ved indgang D)".',
          },
        },
        {
          name: 'googleMapsUrl',
          type: 'text',
          required: true,
          admin: {
            description: 'Link to the address on Google Maps, e.g. "https://goo.gl/maps/...".',
          },
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          name: 'phone',
          type: 'text',
          required: true,
          validate: validatePhone,
        },
        {
          name: 'email',
          type: 'email',
        },
      ],
    },
    {
      name: 'openingHours',
      type: 'group',
      label: 'Weekly hours',
      admin: {
        description:
          'Tick "Closed" for days you are shut. For hours past midnight (e.g. open until 02:00) just set the closing time — it is treated as the next morning.',
      },
      // The 7 dayFields sit DIRECTLY in this group (no nested `days`) so the
      // generated type is structurally identical to WeekSchedule.
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
    {
      name: 'socialMedia',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: socialPlatformOptions,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'Profile URL',
        },
      ],
      maxRows: socialPlatformOptions.length,
    },
  ],
  hooks: {
    afterChange: [revalidateBusinessInfo],
  },
  versions: false,
}
