import { afterEach, describe, expect, it } from 'vitest'

import { generateMeta } from '@/utilities/generateMeta'
import { DEFAULT_META_DESCRIPTION, getSiteTitle } from '@/utilities/siteMetadata'

const SERVER_URL = 'https://saigon-45.vercel.app'

const originalServerURL = process.env.NEXT_PUBLIC_SERVER_URL

afterEach(() => {
  if (originalServerURL === undefined) {
    Reflect.deleteProperty(process.env, 'NEXT_PUBLIC_SERVER_URL')
  } else {
    process.env.NEXT_PUBLIC_SERVER_URL = originalServerURL
  }
})

const createDocument = ({
  imageUpdatedAt,
  imageUrl,
  metaDescription = 'Fresh food in Rødovre Centrum.',
  metaTitle = 'Asian street food',
  slug = 'home',
  title = 'Forside',
}: {
  imageUpdatedAt?: string
  imageUrl?: string
  metaDescription?: string
  metaTitle?: string
  slug?: string
  title?: string
} = {}) =>
  ({
    meta: {
      description: metaDescription,
      image: imageUrl
        ? {
            alt: 'Et bord fyldt med retter',
            height: 630,
            updatedAt: imageUpdatedAt,
            sizes: {
              og: {
                height: 630,
                url: imageUrl,
                width: 1200,
              },
            },
            url: imageUrl,
            width: 1200,
          }
        : undefined,
      title: metaTitle,
    },
    slug,
    title,
  }) as unknown as Parameters<typeof generateMeta>[0]['doc']

describe('site metadata', () => {
  it('uses the Saigon 45 brand in generated titles', () => {
    expect(getSiteTitle('Asian street food')).toBe('Asian street food | Saigon 45')
    expect(getSiteTitle()).toBe('Saigon 45')
  })

  it('keeps absolute Open Graph image URLs unchanged', async () => {
    process.env.NEXT_PUBLIC_SERVER_URL = SERVER_URL
    const imageUrl = 'https://pub.example.r2.dev/social-image.webp'

    const metadata = await generateMeta({
      collection: 'pages',
      doc: createDocument({ imageUrl }),
    })

    expect(metadata.openGraph).toMatchObject({
      images: [{ alt: 'Et bord fyldt med retter', height: 630, url: imageUrl, width: 1200 }],
      siteName: 'Saigon 45',
      title: 'Asian street food | Saigon 45',
    })
  })

  it('resolves relative Open Graph image URLs against the site URL', async () => {
    process.env.NEXT_PUBLIC_SERVER_URL = SERVER_URL

    const metadata = await generateMeta({
      collection: 'pages',
      doc: createDocument({ imageUrl: '/media/social-image.webp' }),
    })

    expect(metadata.openGraph).toMatchObject({
      images: [{ url: `${SERVER_URL}/media/social-image.webp` }],
    })
  })

  it('versions Open Graph image URLs so immutable R2 objects can be replaced safely', async () => {
    process.env.NEXT_PUBLIC_SERVER_URL = SERVER_URL
    const imageUrl = 'https://pub.example.r2.dev/social-image.webp'
    const imageUpdatedAt = '2026-09-04T20:00:00.000Z'

    const metadata = await generateMeta({
      collection: 'pages',
      doc: createDocument({ imageUpdatedAt, imageUrl }),
    })

    expect(metadata.openGraph).toMatchObject({
      images: [{ url: `${imageUrl}?${encodeURIComponent(imageUpdatedAt)}` }],
    })
  })

  it('falls back to the default social image when none is selected', async () => {
    process.env.NEXT_PUBLIC_SERVER_URL = SERVER_URL

    const metadata = await generateMeta({ collection: 'pages', doc: createDocument() })

    expect(metadata.openGraph).toMatchObject({
      images: [{ height: 630, url: `${SERVER_URL}/saigon-45-og.webp`, width: 1200 }],
    })
  })

  it('falls back to the site description when a page has no SEO description', async () => {
    process.env.NEXT_PUBLIC_SERVER_URL = SERVER_URL

    const metadata = await generateMeta({
      collection: 'pages',
      doc: createDocument({ metaDescription: '' }),
    })

    // Returning `undefined` would strip the root layout's description rather
    // than inherit it, leaving the page with no description at all.
    expect(metadata.description).toBe(DEFAULT_META_DESCRIPTION)
    expect(metadata.openGraph).toMatchObject({ description: DEFAULT_META_DESCRIPTION })
  })

  it('falls back to the document title when a page has no SEO title', async () => {
    process.env.NEXT_PUBLIC_SERVER_URL = SERVER_URL

    const metadata = await generateMeta({
      collection: 'pages',
      doc: createDocument({ metaTitle: '', slug: 'menu', title: 'Menu' }),
    })

    expect(metadata.title).toBe('Menu | Saigon 45')
    expect(metadata.openGraph).toMatchObject({ title: 'Menu | Saigon 45' })
  })

  it('points og:url at the page itself rather than always at the front page', async () => {
    process.env.NEXT_PUBLIC_SERVER_URL = SERVER_URL

    const home = await generateMeta({ collection: 'pages', doc: createDocument() })
    const page = await generateMeta({ collection: 'pages', doc: createDocument({ slug: 'om-os' }) })
    const post = await generateMeta({
      collection: 'posts',
      doc: createDocument({ slug: 'bubble-tea' }),
    })

    expect(home.openGraph).toMatchObject({ url: `${SERVER_URL}/` })
    expect(page.openGraph).toMatchObject({ url: `${SERVER_URL}/om-os` })
    expect(post.openGraph).toMatchObject({ url: `${SERVER_URL}/posts/bubble-tea` })
  })
})
