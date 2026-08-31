import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'
import { DEFAULT_META_DESCRIPTION, DEFAULT_OG_IMAGE_PATH, SITE_NAME } from './siteMetadata'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: DEFAULT_META_DESCRIPTION,
  images: [
    {
      url: new URL(DEFAULT_OG_IMAGE_PATH, `${getServerSideURL()}/`).toString(),
    },
  ],
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
