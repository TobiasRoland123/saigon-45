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
}) => {
  return {
    slug: 'home',
    _status: 'published',
    hero: {
      type: 'highImpact',
      infoItems: [
        {
          icon: 'mapPin',
          label: 'Rødovre Centrum 41',
        },
        {
          icon: 'clock',
          label: 'Åben: 10:00 - 20:00',
        },
      ],
      links: [
        {
          link: {
            type: 'custom',
            appearance: 'default',
            label: 'Bestil nu',
            url: '#',
          },
        },
        {
          link: {
            type: 'custom',
            appearance: 'outline',
            label: 'Se menu',
            url: '#',
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
                  text: 'Asiatisk takeaway & bubble tea i Rødovre Centrum',
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
                  text: 'Oplev vores frisklavede wokretter, sprøde snacks og det største udvalg af bubble tea. Perfekt til en pause i shoppingen eller en hyggelig aften hjemme.',
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
        blockName: 'Menu Highlights',
        blockType: 'menuHighlights',
        heading: 'Hvad har du lyst til?',
        intro:
          'Vælg mellem varme wokretter, sprøde snacks og farverige bubble teas, lavet hurtigt og friskt midt i Rødovre Centrum.',
        cards: [
          {
            media: menuImages[0].id,
            imageLabel: 'Wok & nudler',
            badge: 'Populært',
            title: 'Frisklavede asiatiske favoritter',
            description:
              'Varme retter med grøntsager, nudler og saucer med masser af smag. Perfekt når du vil have et hurtigt måltid uden at gå på kompromis.',
            link: {
              type: 'custom',
              label: 'Se wokretter',
              url: '#menu',
            },
          },
          {
            media: menuImages[1].id,
            imageLabel: 'Bubble tea',
            badge: 'Koldt',
            title: 'Bubble tea i mange varianter',
            description:
              'Frugtige, cremede og forfriskende drikke med popping boba eller tapioka. Find din favorit til shoppingturen eller tag den med hjem.',
            link: {
              type: 'custom',
              label: 'Se drikke',
              url: '#drikke',
            },
          },
          {
            media: menuImages[2].id,
            imageLabel: 'Snacks',
            title: 'Sprøde småretter til deling',
            description:
              'Gør måltidet komplet med snacks og sider, der passer til både frokostpausen, børnefamilien og den hurtige takeaway-bestilling.',
            link: {
              type: 'custom',
              label: 'Se snacks',
              url: '#snacks',
            },
          },
        ],
      },
      {
        blockName: 'Selskaber & Events',
        blockType: 'splitContent',
        eyebrow: 'Planlægger du et event?',
        heading: 'Selskaber & Events',
        description:
          'Lad os stå for maden til din næste fest, reception eller firmafrokost. Vi tilbyder skræddersyede menuer til selskaber og firmaer, der ønsker autentiske asiatiske smagsoplevelser.',
        features: [
          {
            label: 'Skræddersyede catering-menuer',
          },
          {
            label: 'Perfekt til både små og store selskaber',
          },
          {
            label: 'Mulighed for levering eller afhentning',
          },
        ],
        primaryLink: {
          type: 'custom',
          appearance: 'default',
          label: 'Hør mere om selskaber',
          url: '#',
        },
        media: metaImage.id,
        imageCallout: 'Book dit næste event hos os',
      },
      {
        blockName: 'Content Block',
        blockType: 'content',
        columns: [
          {
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
                        text: 'Core features',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    tag: 'h2',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            },
            size: 'full',
          },
          {
            enableLink: false,
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
                        text: 'Admin Dashboard',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    tag: 'h3',
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
                        text: "Manage this site's pages and posts from the ",
                        version: 1,
                      },
                      {
                        type: 'link',
                        children: [
                          {
                            type: 'text',
                            detail: 0,
                            format: 0,
                            mode: 'normal',
                            style: '',
                            text: 'admin dashboard',
                            version: 1,
                          },
                        ],
                        direction: 'ltr',
                        fields: {
                          linkType: 'custom',
                          newTab: false,
                          url: '/admin',
                        },
                        format: '',
                        indent: 0,
                        version: 2,
                      },
                      {
                        type: 'text',
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: '.',
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
            size: 'oneThird',
          },
          {
            enableLink: false,
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
                        text: 'Preview',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    tag: 'h3',
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
                        text: 'Using versions, drafts, and preview, editors can review and share their changes before publishing them.',
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
            size: 'oneThird',
          },
          {
            enableLink: false,
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
                        text: 'Page Builder',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    tag: 'h3',
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
                        text: 'Custom page builder allows you to create unique page, post, and project layouts for any type of content.',
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
            size: 'oneThird',
          },
          {
            enableLink: false,
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
                        text: 'SEO',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    tag: 'h3',
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
                        text: 'Editors have complete control over SEO data and site content directly from the ',
                        version: 1,
                      },
                      {
                        type: 'link',
                        children: [
                          {
                            type: 'text',
                            detail: 0,
                            format: 0,
                            mode: 'normal',
                            style: '',
                            text: 'admin dashboard',
                            version: 1,
                          },
                        ],
                        direction: 'ltr',
                        fields: {
                          linkType: 'custom',
                          newTab: false,
                          url: '/admin',
                        },
                        format: '',
                        indent: 0,
                        version: 2,
                      },
                      {
                        type: 'text',
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: '.',
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
            size: 'oneThird',
          },
          {
            enableLink: false,
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
                        text: 'Dark Mode',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    tag: 'h3',
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
                        text: 'Users will experience this site in their preferred color scheme and each block can be inverted.',
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
            size: 'oneThird',
          },
        ],
      },
      {
        blockName: 'Media Block',
        blockType: 'mediaBlock',
        media: metaImage.id,
      },
      {
        blockName: 'Reviews Section',
        blockType: 'reviews',
        eyebrow: 'Kvalitet du kan smage',
        ratingLabel: '4.5+ Stjerner på Google',
        ratingDescription: 'Vores gæster elsker vores mad og hurtige service.',
        ratingIcon: 'star',
        smileyTitle: 'Elite Smiley',
        smileyIcon: 'badgeCheck',
        smileyLinkLabel: 'Se vores seneste Smiley-rapport her.',
        reviews: [
          {
            name: 'Thomas Berg',
            quote: 'Fantastisk gyoza! Prøv dem som snack til din bubble tea.',
            rating: 5,
            source: 'Google Review',
          },
          {
            name: 'Sofie Nielsen',
            quote:
              'Virkelig lækker bubble tea og superhurtig service. Jeg kommer helt sikkert igen.',
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
      },
      {
        blockName: 'Archive Block',
        blockType: 'archive',
        categories: [],
        introContent: {
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
                    text: 'Recent posts',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                tag: 'h3',
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
                    text: 'The posts below are displayed in an "Archive" layout building block which is an extremely powerful way to display documents on a page. It can be auto-populated by collection or by category, or posts can be individually selected. Pagination controls will automatically appear if the number of results exceeds the number of items per page.',
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
        populateBy: 'collection',
        relationTo: 'posts',
      },
      {
        blockName: 'CTA',
        blockType: 'cta',
        links: [
          {
            link: {
              type: 'custom',
              appearance: 'default',
              label: 'All posts',
              url: '/posts',
            },
          },
        ],
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
                    text: 'This is a call to action',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                tag: 'h3',
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
                    text: 'This is a custom layout building block ',
                    version: 1,
                  },
                  {
                    type: 'link',
                    children: [
                      {
                        type: 'text',
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'configured in the admin dashboard',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    fields: {
                      linkType: 'custom',
                      newTab: false,
                      url: '/admin',
                    },
                    format: '',
                    indent: 0,
                    version: 2,
                  },
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: '.',
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
    ],
    meta: {
      description: 'An open-source website built with Payload and Next.js.',
      image: heroImage.id,
      title: 'Payload Website Template',
    },
    title: 'Home',
  }
}
