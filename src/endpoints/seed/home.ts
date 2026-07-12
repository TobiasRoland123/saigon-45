import type { RequiredDataFromCollectionSlug } from 'payload'

import type { Media } from '@/payload-types'

type HomeArgs = {
  heroImage: Media
  menuImages: [Media, Media, Media]
  metaImage: Media
}

export const home: (args: HomeArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  heroImage,
  menuImages,
  metaImage,
}) => ({
  title: 'Forside',
  slug: 'home',
  _status: 'published',
  hero: {
    type: 'highImpact',
    infoItems: [
      { icon: 'mapPin', label: 'Rødovre Centrum 41' },
      { icon: 'clock', label: 'Man–lør 10:00–20:00 · søn 10:00–19:00' }
    ],
    links: [
      {
        link: {
          type: 'custom',
          appearance: 'default',
          label: 'Bestil nu',
          url: '/menu',
        },
      },
      {
        link: {
          type: 'custom',
          appearance: 'outline',
          label: 'Se vores udvalg',
          url: '/menu',
        },
      },
    ],
    media: heroImage.id,
    richText: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Asiatisk street food og bubble tea i Rødovre Centrum',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'h1',
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Friske wokretter, sprøde snacks og farverige drikke – klar til din pause, shoppingtur eller hyggelige aften hjemme.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
  },
  layout: [
    {
      blockName: 'Derfor vælger gæster os',
      blockType: 'featureHighlights',
      items: [
        { icon: 'leaf', title: 'Lavet friskt', subtitle: 'Tilberedt, når du bestiller' },
        { icon: 'clock', title: 'Klar på ingen tid', subtitle: 'Ideelt til en travl hverdag' },
        { icon: 'mapPin', title: 'Lige ved dig', subtitle: 'Midt i Rødovre Centrum' },
      ],
    },
    {
      blockName: 'Menu-favoritter',
      blockType: 'menuHighlights',
      heading: 'Find din næste favorit',
      intro:
        'Uanset om du er sulten efter noget varmt, sprødt eller forfriskende, har vi noget til dig.',
      cards: [
        {
          media: menuImages[0].id,
          imageLabel: 'Wok og nudler',
          badge: 'Populært',
          title: 'Varme wokretter med masser af smag',
          description:
            'Vælg din favorit med nudler, ris og friske grøntsager i en sauce, der passer til dit humør.',
          link: { type: 'custom', label: 'Se wokretter', url: '/menu' },
        },
        {
          media: menuImages[1].id,
          imageLabel: 'Bubble tea',
          badge: 'Forfriskende',
          title: 'Bubble tea på din måde',
          description:
            'Cremet, frugtig eller iskold – vælg din base, topping og sødme, og tag din favorit med på farten.',
          link: { type: 'custom', label: 'Se drikke', url: '#menu' },
        },
        {
          media: menuImages[2].id,
          imageLabel: 'Snacks',
          title: 'Sprøde snacks til at dele',
          description:
            'Gyoza, små sider og sprøde bidder, som gør både frokosten og takeaway-aftenen lidt bedre.',
          link: { type: 'custom', label: 'Se snacks', url: '#menu' },
        },
      ],
    },
    {
      blockName: 'Catering og selskaber',
      blockType: 'splitContent',
      eyebrow: 'Mad til flere',
      heading: 'Gør næste arrangement nemt og velsmagende',
      description:
        'Vi hjælper med asiatisk mad til fødselsdage, møder og uformelle sammenkomster. Fortæl os, hvor mange I bliver, så finder vi en menu, der passer.',
      features: [
        { label: 'Sammensæt en menu efter jeres ønsker' },
        { label: 'Velegnet til både små og store selskaber' },
        { label: 'Afhentning, når det passer jer' },
      ],
      primaryLink: {
        type: 'custom',
        appearance: 'default',
        label: 'Spørg om catering',
        url: '/kontakt',
      },
      media: metaImage.id,
      imageCallout: 'Lad os tage os af maden',
    },
    {
      blockName: 'Gæsternes anmeldelser',
      blockType: 'reviews',
      eyebrow: 'Kvalitet, du kan smage',
      ratingLabel: 'Elsket af lokale gæster',
      ratingDescription:
        'Hurtig service, friske råvarer og smag, man får lyst til at komme tilbage efter.',
      ratingIcon: 'star',
      smileyTitle: 'Fokus på god kvalitet',
      smileyIcon: 'badgeCheck',
      smileyLinkLabel: 'Se vores seneste Smiley-rapport her.',
      reviews: [
        {
          name: 'Amalie Jensen',
          quote:
            'Min go-to til en hurtig frokost. Wokken er altid varm og fuld af friske grøntsager.',
          rating: 5,
          source: 'Google Review',
        },
        {
          name: 'Mads Larsen',
          quote:
            'Virkelig god bubble tea og sød betjening. Børnene vil altid gerne forbi, når vi er i centret.',
          rating: 5,
          source: 'Google Review',
        },
        {
          name: 'Signe Holm',
          quote: 'De sprøde snacks og gyoza er perfekte at dele. Vi kommer gerne igen.',
          rating: 5,
          source: 'Google Review',
        },
      ],
    },
  ],
  meta: {
    title: 'Asiatisk street food og bubble tea i Rødovre Centrum',
    description:
      'Bestil frisklavede wokretter, sprøde snacks og bubble tea hos os i Rødovre Centrum.',
    image: metaImage.id,
  },
})
