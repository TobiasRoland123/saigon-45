import type { RequiredDataFromCollectionSlug } from 'payload'

import type { Media } from '@/payload-types'

type AboutArgs = {
  contactImage: Media
}

export const about: (args: AboutArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  contactImage,
}) => ({
  title: 'Om os',
  slug: 'om-os',
  _status: 'published',
  hero: {
    type: 'none',
  },
  layout: [
    {
      blockName: 'Contact Section',
      blockType: 'contact',
      heading: 'Lad os høre fra dig',
      description:
        'Har du spørgsmål til din reservation, vores menu eller ønsker du at høre om selskabsmuligheder? Vores team står altid klar til at hjælpe.',
      phoneLabel: 'Ring til os',
      emailLabel: 'Send en mail',
      media: contactImage.id,
    },
  ],
})
