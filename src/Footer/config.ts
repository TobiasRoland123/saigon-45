import type { GlobalConfig, TextFieldSingleValidation } from 'payload'

import { socialPlatformOptions } from '@/components/icons/socialIconRegistry'
import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'
import { validatePhoneNumber } from '@/utilities/validatePhoneNumber'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'About',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'AboutLabel',
          type: 'text',
          required: true,
        },
        {
          name: 'AboutSaigon45',
          type: 'textarea',
          required: true,
        },
        {
          name: 'AboutCopyRightDetails',
          type: 'text',
          required: true,
        },
      ],
      maxRows: 1,
    },
    {
      name: 'ContactAndDetails',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'ContactAddress',
          type: 'text',
          required: true,
        },
        {
          name: 'ContactPhoneNumber',
          type: 'text',
          required: true,
          validate: ((value) => {
            const result = validatePhoneNumber(value ?? '')
            return result.valid ? true : (result.error ?? 'Ugyldigt telefonnummer')
          }) as TextFieldSingleValidation,
        },
        {
          name: 'ContactOpeningHouse',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
            },
          }),
        },
      ],
      maxRows: 1,
    },
    {
      name: 'SocialMedia',
      type: 'array',
      admin: {
        initCollapsed: false,
      },
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
    {
      name: 'navItems',
      type: 'array',
      fields: [
        {
          name: 'navLabel',
          type: 'text',
          required: true,
          defaultValue: '',
        },
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
  versions: false,
}
