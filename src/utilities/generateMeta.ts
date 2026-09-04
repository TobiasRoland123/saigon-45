import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getMediaUrl } from './getMediaUrl'
import { getServerSideURL } from './getURL'
import { collectionPrefixMap } from './generatePreviewPath'
import {
  DEFAULT_META_DESCRIPTION,
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_PATH,
  DEFAULT_OG_IMAGE_WIDTH,
  getSiteTitle,
} from './siteMetadata'

type MetaCollection = 'pages' | 'posts'

/**
 * Media URLs are absolute when uploads live in R2/Vercel Blob and relative when
 * they are served from this app, so resolve both against the site URL rather
 * than concatenating — concatenation mangles the absolute ones.
 */
const toAbsoluteURL = (path: string) => new URL(path, `${getServerSideURL()}/`).toString()

type OpenGraphImage = {
  alt: string
  height?: number
  url: string
  width?: number
}

const defaultOpenGraphImage = (): OpenGraphImage => ({
  alt: DEFAULT_OG_IMAGE_ALT,
  height: DEFAULT_OG_IMAGE_HEIGHT,
  url: toAbsoluteURL(DEFAULT_OG_IMAGE_PATH),
  width: DEFAULT_OG_IMAGE_WIDTH,
})

/** Prefer the generated `og` size, falling back to the original upload. */
const pickImageSource = (media: Media) => (media.sizes?.og?.url ? media.sizes.og : media)

const getOpenGraphImage = (
  image?: Media | Config['db']['defaultIDType'] | null,
): OpenGraphImage => {
  if (!image || typeof image !== 'object') return defaultOpenGraphImage()

  const source = pickImageSource(image)

  if (!source.url) return defaultOpenGraphImage()

  return {
    alt: image.alt || DEFAULT_OG_IMAGE_ALT,
    height: source.height ?? undefined,
    url: toAbsoluteURL(getMediaUrl(source.url, image.updatedAt)),
    width: source.width ?? undefined,
  }
}

const getCanonicalPath = (collection: MetaCollection, slug?: string | null) => {
  const prefix = collectionPrefixMap[collection] ?? ''

  // The `home` page is served from the site root, not from `/home`.
  if (!slug || (collection === 'pages' && slug === 'home')) return prefix || '/'

  // Encode to support slugs with special characters, matching the page routes.
  return `${prefix}/${encodeURIComponent(slug)}`
}

export const generateMeta = async (args: {
  collection: MetaCollection
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { collection, doc } = args

  // Returning `undefined` here would strip the root layout's defaults rather
  // than inherit them, so fall back explicitly.
  const description = doc?.meta?.description || DEFAULT_META_DESCRIPTION
  const title = getSiteTitle(doc?.meta?.title || doc?.title)

  return {
    description,
    openGraph: mergeOpenGraph({
      description,
      images: [getOpenGraphImage(doc?.meta?.image)],
      title,
      url: toAbsoluteURL(getCanonicalPath(collection, doc?.slug)),
    }),
    title,
  }
}
