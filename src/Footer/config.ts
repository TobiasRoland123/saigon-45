import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'
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
        },
        {
          name: 'ContactOpeningHouse',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
            },
          }),
          label: 'Opening Hours',
        },
        // {
        //   name: 'ContactOpeningHouse',
        //   type: 'textarea',
        //   required: true,
        // },
      ],
      maxRows: 1,
    },
    {
      name: 'SocialLinks',
      type: 'array',
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
      },
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
