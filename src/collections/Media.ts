import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'

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

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const generateBlurPlaceholder: CollectionBeforeChangeHook = async ({
  data,
  operation,
  req,
}) => {
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
    beforeChange: [generateBlurPlaceholder],
  },
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve(dirname, '../../public/media'),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
}
