import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'
import {
  DEFAULT_META_DESCRIPTION,
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_PATH,
  DEFAULT_OG_IMAGE_WIDTH,
  SITE_NAME,
} from './siteMetadata'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: DEFAULT_META_DESCRIPTION,
  images: [
    {
      alt: DEFAULT_OG_IMAGE_ALT,
      height: DEFAULT_OG_IMAGE_HEIGHT,
      url: new URL(DEFAULT_OG_IMAGE_PATH, `${getServerSideURL()}/`).toString(),
      width: DEFAULT_OG_IMAGE_WIDTH,
    },
  ],
  locale: 'da_DK',
  siteName: SITE_NAME,
  title: SITE_NAME,
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
