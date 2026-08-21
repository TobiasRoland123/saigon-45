import type { Block } from 'payload'

import { uniqueHeadingField } from '@/fields/uniqueHeading'

export const Contact: Block = {
  slug: 'contact',
  interfaceName: 'ContactBlock',
  fields: [
    {
      ...uniqueHeadingField,
      defaultValue: 'Lad os høre fra dig',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue:
        'Har du spørgsmål til din reservation, vores menu eller ønsker du at høre om selskabsmuligheder? Vores team står altid klar til at hjælpe.',
    },
    {
      name: 'phoneLabel',
      type: 'text',
      required: true,
      defaultValue: 'Ring til os',
    },
    {
      name: 'emailLabel',
      type: 'text',
      required: true,
      defaultValue: 'Send en mail',
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Restaurant image shown beside the contact details.',
      },
    },
  ],
  labels: {
    plural: 'Contact Sections',
    singular: 'Contact Section',
  },
}
