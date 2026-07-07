import type { CollectionSlug, Payload, PayloadRequest, File } from 'payload'
import { readFile, stat } from 'node:fs/promises'
import { basename, extname, join } from 'node:path'

import type { OpeningHour } from '@/payload-types'

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
  'form-submissions',
  'search',
  'pages',
  'posts',
  'forms',
  'media',
  'categories',
]

const categories = ['Technology', 'News', 'Finance', 'Design', 'Software', 'Engineering']

const openingHoursData = {
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
} satisfies Partial<OpeningHour>

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
      data: openingHoursData,
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
  for (const collection of collections) {
    await payload.db.deleteMany({ collection, req, where: {} })
  }

  for (const collection of collections) {
    if (payload.collections[collection].config.versions) {
      await payload.db.deleteVersions({ collection, req, where: {} })
    }
  }

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

  const [image1Buffer, image2Buffer, image3Buffer, hero1Buffer] = await Promise.all([
    getLocalSeedFile('image-post1.webp'),
    getLocalSeedFile('image-post2.webp'),
    getLocalSeedFile('image-post3.webp'),
    getLocalSeedFile('image-hero1.webp'),
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
      data: openingHoursData,
    }),
  ])

  payload.logger.info('Seeded database successfully!')
}

async function getLocalSeedFile(filename: string): Promise<File> {
  const filePath = join(process.cwd(), 'src', 'endpoints', 'seed', filename)
  const [data, file] = await Promise.all([readFile(filePath), stat(filePath)])

  return {
    name: basename(filePath),
    data,
    mimetype: `image/${extname(filePath).slice(1)}`,
    size: file.size,
  }
}
