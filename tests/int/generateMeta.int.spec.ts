import { afterEach, describe, expect, it } from 'vitest'

import { generateMeta } from '@/utilities/generateMeta'
import { getSiteTitle } from '@/utilities/siteMetadata'

const SERVER_URL = 'https://saigon-45.vercel.app'

const originalServerURL = process.env.NEXT_PUBLIC_SERVER_URL

afterEach(() => {
  if (originalServerURL === undefined) {
    Reflect.deleteProperty(process.env, 'NEXT_PUBLIC_SERVER_URL')
  } else {
    process.env.NEXT_PUBLIC_SERVER_URL = originalServerURL
  }
})

const createDocument = ({ imageUrl, slug = 'home' }: { imageUrl?: string; slug?: string } = {}) =>
  ({
    meta: {
      description: 'Fresh food in Rødovre Centrum.',
      image: imageUrl
        ? {
            alt: 'Et bord fyldt med retter',
            height: 630,
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
      title: 'Asian street food',
    },
    slug,
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

  it('falls back to the default social image when none is selected', async () => {
    process.env.NEXT_PUBLIC_SERVER_URL = SERVER_URL

    const metadata = await generateMeta({ collection: 'pages', doc: createDocument() })

    expect(metadata.openGraph).toMatchObject({
      images: [{ height: 630, url: `${SERVER_URL}/saigon-45-og.webp`, width: 1200 }],
    })
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
