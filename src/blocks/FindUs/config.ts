import type { Block } from 'payload'

export const FindUs: Block = {
  slug: 'findUs',
  interfaceName: 'FindUsBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Besøg os i dag',
      admin: {
        description: 'Adresse, åbningstider og telefonnummer hentes fra Settings → Business Info.',
      },
    },
    {
      name: 'addressLabel',
      type: 'text',
      required: true,
      defaultValue: 'Adresse',
    },
    {
      name: 'hoursLabel',
      type: 'text',
      required: true,
      defaultValue: 'Åbningstider',
    },
    {
      name: 'contactLabel',
      type: 'text',
      required: true,
      defaultValue: 'Kontakt',
    },
    {
      name: 'buttonLabel',
      type: 'text',
      required: true,
      defaultValue: 'Find vej på Google Maps',
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Kort/billede vist til højre, fx screenshot af centerkortet.',
      },
    },
  ],
  labels: {
    singular: 'Find Us Section',
    plural: 'Find Us Sections',
  },
}
