import type {
  CollectionAfterOperationHook,
  CollectionBeforeChangeHook,
  CollectionBeforeOperationHook,
  CollectionConfig,
} from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { applyR2MediaCacheControl } from '../utilities/r2CacheControl'
import { getMediaUrl } from '../utilities/getMediaUrl'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const webpFormatOptions = {
  format: 'webp' as const,
  options: {
    quality: 82,
  },
}
const uploadPendingContextKey = 'r2MediaCacheControlPending'

export const getAdminThumbnail = ({ doc }: { doc: Record<string, unknown> }): null | string => {
  const sizes = doc.sizes

  if (!sizes || typeof sizes !== 'object') return null

  const thumbnail = (sizes as Record<string, unknown>).thumbnail

  if (!thumbnail || typeof thumbnail !== 'object') return null

  const url = (thumbnail as Record<string, unknown>).url
  const updatedAt = doc.updatedAt

  return typeof url === 'string'
    ? getMediaUrl(url, typeof updatedAt === 'string' ? updatedAt : null)
    : null
}

export const generateBlurPlaceholder: CollectionBeforeChangeHook = async ({ data, req }) => {
  try {
    const file = req.file
    const mimeType = file && 'mimetype' in file ? file.mimetype : undefined

    // Only generate when an image file is actually being uploaded (covers create + file-replacing updates)
    if (!file?.data || !mimeType?.startsWith('image/')) {
      return data
    }

    const buffer = await sharp(file.data)
      .resize({ width: 24, withoutEnlargement: true })
      .blur()
      .webp({ quality: 35 })
      .toBuffer()

    return {
      ...data,
      blurPlaceholder: `data:image/webp;base64,${buffer.toString('base64')}`,
    }
  } catch (error) {
    req.payload.logger.warn({
      err: error,
      msg: 'Failed to generate media blur placeholder',
    })

    return data
  }
}

export const markR2MediaUpload: CollectionBeforeOperationHook<'media'> = ({ req }) => {
  if (req.file) {
    req.context[uploadPendingContextKey] = true
  }
}

export const setR2MediaCacheControl: CollectionAfterOperationHook<'media'> = async ({
  req,
  result,
}) => {
  if (!req.context[uploadPendingContextKey]) return result

  if (!result || typeof result !== 'object' || Array.isArray(result) || !('filename' in result)) {
    return result
  }

  try {
    await applyR2MediaCacheControl(result as Parameters<typeof applyR2MediaCacheControl>[0])
    delete req.context[uploadPendingContextKey]
  } catch (error) {
    // Payload's storage hook can perform a nested update. Keeping the marker
    // lets the outer operation retry once if that first metadata write fails.
    req.payload.logger.warn({
      err: error,
      msg: 'Failed to apply cache-control metadata to R2 media',
    })
  }

  return result
}

export const Media: CollectionConfig = {
  slug: 'media',
  folders: true,
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'blurPlaceholder',
      type: 'textarea',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'alt',
      type: 'text',
      //required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  hooks: {
    afterOperation: [setR2MediaCacheControl],
    beforeChange: [generateBlurPlaceholder],
    beforeOperation: [markR2MediaUpload],
  },
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve(dirname, '../../public/media'),
    adminThumbnail: getAdminThumbnail,
    focalPoint: true,
    formatOptions: webpFormatOptions,
    imageSizes: [
      {
        formatOptions: webpFormatOptions,
        name: 'thumbnail',
        width: 300,
      },
      {
        formatOptions: webpFormatOptions,
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        formatOptions: webpFormatOptions,
        name: 'small',
        width: 600,
      },
      {
        formatOptions: webpFormatOptions,
        name: 'medium',
        width: 900,
      },
      {
        formatOptions: webpFormatOptions,
        name: 'large',
        width: 1400,
      },
      {
        formatOptions: webpFormatOptions,
        name: 'xlarge',
        width: 1920,
      },
      {
        formatOptions: webpFormatOptions,
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
}
