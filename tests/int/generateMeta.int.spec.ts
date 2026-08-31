import { afterEach, describe, expect, it } from 'vitest'

import { generateMeta } from '@/utilities/generateMeta'
import { getSiteTitle } from '@/utilities/siteMetadata'

const originalServerURL = process.env.NEXT_PUBLIC_SERVER_URL

afterEach(() => {
  if (originalServerURL === undefined) {
    Reflect.deleteProperty(process.env, 'NEXT_PUBLIC_SERVER_URL')
  } else {
    process.env.NEXT_PUBLIC_SERVER_URL = originalServerURL
  }
})

const createDocument = (imageUrl?: string) =>
  ({
    meta: {
      description: 'Fresh food in Rødovre Centrum.',
      image: imageUrl
        ? {
            sizes: {
              og: {
                url: imageUrl,
              },
            },
            url: imageUrl,
          }
        : undefined,
      title: 'Asian street food',
    },
    slug: 'home',
  }) as unknown as Parameters<typeof generateMeta>[0]['doc']

describe('site metadata', () => {
  it('uses the Saigon 45 brand in generated titles', () => {
    expect(getSiteTitle('Asian street food')).toBe('Asian street food | Saigon 45')
    expect(getSiteTitle()).toBe('Saigon 45')
  })

  it('keeps absolute Open Graph image URLs unchanged', async () => {
    process.env.NEXT_PUBLIC_SERVER_URL = 'https://saigon-45.vercel.app'
    const imageUrl = 'https://pub.example.r2.dev/social-image.webp'

    const metadata = await generateMeta({ doc: createDocument(imageUrl) })

    expect(metadata.openGraph).toMatchObject({
      images: [{ url: imageUrl }],
      siteName: 'Saigon 45',
      title: 'Asian street food | Saigon 45',
    })
  })

  it('resolves relative Open Graph image URLs against the site URL', async () => {
    process.env.NEXT_PUBLIC_SERVER_URL = 'https://saigon-45.vercel.app'

    const metadata = await generateMeta({ doc: createDocument('/media/social-image.webp') })

    expect(metadata.openGraph).toMatchObject({
      images: [{ url: 'https://saigon-45.vercel.app/media/social-image.webp' }],
    })
  })

  it('uses the food photo when no Open Graph image is selected', async () => {
    process.env.NEXT_PUBLIC_SERVER_URL = 'https://saigon-45.vercel.app'

    const metadata = await generateMeta({ doc: createDocument() })

    expect(metadata.openGraph).toMatchObject({
      images: [
        {
          url: 'https://saigon-45.vercel.app/473622995_565282999663129_5661000132917835598_n.webp',
        },
      ],
    })
  })
})
