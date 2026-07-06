import type { CollectionSlug, Payload, PayloadRequest, File } from 'payload'
import { randomUUID } from 'crypto'

import { contactForm as contactFormData } from './contact-form'
import { contact as contactPageData } from './contact-page'
import { home } from './home'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { imageHero1 } from './image-hero-1'
import { post1 } from './post-1'
import { post2 } from './post-2'
import { post3 } from './post-3'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'forms',
  'form-submissions',
  'search',
]

const categories = ['Technology', 'News', 'Finance', 'Design', 'Software', 'Engineering']

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not
  payload.logger.info(`— Clearing collections and globals...`)

  const existingMedia = await payload.find({
    collection: 'media',
    depth: 0,
    pagination: false,
  })

  // Delete through Payload so the Vercel Blob adapter removes the stored files too.
  for (const media of existingMedia.docs) {
    await payload.delete({
      collection: 'media',
      id: media.id,
      depth: 0,
      req,
      context: {
        disableRevalidate: true,
      },
    })
  }

  // clear the database
  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: {
        media: null,
        navItems: [],
        WoltCTA: [],
      },
      depth: 0,
      context: {
        disableRevalidate: true,
      },
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: {
        About: [],
        ContactAndDetails: [],
        SocialMedia: [],
        navItems: [],
      },
      depth: 0,
      context: {
        disableRevalidate: true,
      },
    }),
    payload.updateGlobal({
      slug: 'opening-hours',
      data: {
        address: '',
        addressUrl: '',
        days: [],
      },
      depth: 0,
      context: {
        disableRevalidate: true,
      },
    }),
  ])

  await Promise.all(
    collections
      .filter((collection) => collection !== 'media')
      .map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  payload.logger.info(`— Seeding demo author and user...`)

  await payload.delete({
    collection: 'users',
    depth: 0,
    where: {
      email: {
        equals: 'demo-author@example.com',
      },
    },
  })

  payload.logger.info(`— Seeding media...`)

  const seedRunId = Date.now()

  const [image1Buffer, image2Buffer, image3Buffer, hero1Buffer] = await Promise.all([
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post1.webp',
      `seed-${seedRunId}-image-post1.webp`,
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post2.webp',
      `seed-${seedRunId}-image-post2.webp`,
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post3.webp',
      `seed-${seedRunId}-image-post3.webp`,
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-hero1.webp',
      `seed-${seedRunId}-image-hero1.webp`,
    ),
  ])

  const [demoAuthor, image1Doc, image2Doc, image3Doc, imageHomeDoc] = await Promise.all([
    payload.create({
      collection: 'users',
      data: {
        name: 'Demo Author',
        email: 'demo-author@example.com',
        password: 'password',
      },
    }),
    payload.create({
      collection: 'media',
      data: image1,
      file: image1Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image2Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image3Buffer,
    }),
    payload.create({
      collection: 'media',
      data: imageHero1,
      file: hero1Buffer,
    }),
    categories.map((category) =>
      payload.create({
        collection: 'categories',
        data: {
          title: category,
          slug: category,
        },
      }),
    ),
  ])

  payload.logger.info(`— Seeding posts...`)

  // Do not create posts with `Promise.all` because we want the posts to be created in order
  // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order
  const post1Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post1({ heroImage: image1Doc, blockImage: image2Doc, author: demoAuthor }),
  })

  const post2Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post2({ heroImage: image2Doc, blockImage: image3Doc, author: demoAuthor }),
  })

  const post3Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post3({ heroImage: image3Doc, blockImage: image1Doc, author: demoAuthor }),
  })

  // update each post with related posts
  await payload.update({
    id: post1Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post2Doc.id, post3Doc.id],
    },
  })
  await payload.update({
    id: post2Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post3Doc.id],
    },
  })
  await payload.update({
    id: post3Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post2Doc.id],
    },
  })

  payload.logger.info(`— Seeding contact form...`)

  const contactForm = await payload.create({
    collection: 'forms',
    depth: 0,
    data: contactFormData,
  })

  payload.logger.info(`— Seeding pages...`)

  const [_] = await Promise.all([
    payload.create({
      collection: 'pages',
      depth: 0,
      data: home({
        heroImage: imageHomeDoc,
        menuImages: [image1Doc, image2Doc, image3Doc],
        metaImage: image2Doc,
      }),
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      data: contactPageData({ contactForm: contactForm }),
    }),
  ])

  payload.logger.info(`— Seeding globals...`)

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: {
        media: imageHomeDoc.id,
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Menu',
              url: '/menu',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Om os',
              url: '/om-os',
            },
          },
        ],
        WoltCTA: [
          {
            link: {
              type: 'custom',
              label: 'Bestil',
              newTab: true,
              url: 'https://wolt.com/da/dnk/copenhagen/restaurant/saigon-45',
            },
          },
        ],
      },
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: {
        About: [
          {
            AboutLabel: 'Saigon 45',
            AboutSaigon45:
              'Din lokale destination for autentisk asiatisk takeaway og forfriskende bubble tea i hjertet af Rødovre.',
            AboutCopyRightDetails: 'Saigon 45 - Rødovre Centrum. Fresh Asian Fusion & Bubble Tea.',
          },
        ],
        ContactAndDetails: [
          {
            ContactAddress: 'Rødovre Centrum',
            ContactPhoneNumber: '+45 28 68 92 80',
            ContactOpeningHouse: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Man - Lør: 10.00 - 20.00',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
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
                        text: 'Søndag: 10.00 - 19.00',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
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
        SocialMedia: [
          {
            platform: 'facebook',
            url: 'https://www.facebook.com/profile.php?id=100085443011562',
          },
        ],
        navItems: [
          {
            navLabel: 'Menu',
            link: {
              type: 'custom',
              label: 'Menu',
              url: '/menu',
            },
          },
          {
            navLabel: 'Find os',
            link: {
              type: 'custom',
              label: 'Find os',
              url: '/find-os',
            },
          },
          {
            navLabel: 'Om os',
            link: {
              type: 'custom',
              label: 'Om os',
              url: '/om-os',
            },
          },
          {
            navLabel: 'Bestil',
            link: {
              type: 'custom',
              label: 'Bestil',
              newTab: true,
              url: 'https://wolt.com/da/dnk/copenhagen/restaurant/saigon-45',
            },
          },
        ],
      },
    }),
    payload.updateGlobal({
      slug: 'opening-hours',
      data: {
        address: 'Rødovre Centrum 41',
        addressUrl: 'https://maps.app.goo.gl/hyo5nd2EUuAJ4tok7',
        days: [
          {
            day: '1',
            opensAt: '10:00',
            closesAt: '20:00',
          },
          {
            day: '2',
            opensAt: '10:00',
            closesAt: '20:00',
          },
          {
            day: '3',
            opensAt: '10:00',
            closesAt: '20:00',
          },
          {
            day: '4',
            opensAt: '10:00',
            closesAt: '20:00',
          },
          {
            day: '5',
            opensAt: '10:00',
            closesAt: '20:00',
          },
          {
            day: '6',
            opensAt: '10:00',
            closesAt: '20:00',
          },
          {
            day: '0',
            opensAt: '10:00',
            closesAt: '20:00',
          },
        ],
      },
    }),
  ])

  payload.logger.info('Seeded database successfully!')
}

async function fetchFileByURL(url: string, name?: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()
  const fileName = url.split('/').pop() || `file-${Date.now()}`
  const seedFileName = `seed-${randomUUID()}-${fileName}`

  return {
    name: name || seedFileName,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}
