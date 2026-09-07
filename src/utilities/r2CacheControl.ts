import { CopyObjectCommand, HeadObjectCommand, S3Client } from '@aws-sdk/client-s3'
import path from 'path'

export const R2_MEDIA_CACHE_CONTROL = 'public, max-age=31536000, immutable'

type MediaDocument = {
  filename?: null | string
  prefix?: null | string
  sizes?: null | Record<string, null | { filename?: null | string }>
}

type R2Config = {
  accessKeyId: string
  bucket: string
  endpoint: string
  secretAccessKey: string
}

const getR2Config = (): null | R2Config => {
  const bucket = process.env.R2_BUCKET
  const accessKeyId = process.env.R2_ACCESS_KEY_ID
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY
  const endpoint = process.env.R2_ENDPOINT

  if (!bucket || !accessKeyId || !secretAccessKey || !endpoint) return null

  return { accessKeyId, bucket, endpoint, secretAccessKey }
}

export const getMediaObjectKeys = (doc: MediaDocument): string[] => {
  const filenames = [
    doc.filename,
    ...Object.values(doc.sizes ?? {}).map((size) => size?.filename),
  ].filter((filename): filename is string => Boolean(filename))

  return [...new Set(filenames)].map((filename) => path.posix.join(doc.prefix || '', filename))
}

const getCopySource = (bucket: string, key: string) =>
  `${bucket}/${key.split('/').map(encodeURIComponent).join('/')}`

export const applyR2MediaCacheControl = async (doc: MediaDocument): Promise<void> => {
  const config = getR2Config()
  if (!config) return

  const client = new S3Client({
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
    endpoint: config.endpoint,
    forcePathStyle: true,
    region: 'auto',
  })

  await Promise.all(
    getMediaObjectKeys(doc).map(async (key) => {
      const metadata = await client.send(new HeadObjectCommand({ Bucket: config.bucket, Key: key }))

      if (metadata.CacheControl === R2_MEDIA_CACHE_CONTROL) return

      await client.send(
        new CopyObjectCommand({
          Bucket: config.bucket,
          CacheControl: R2_MEDIA_CACHE_CONTROL,
          ContentDisposition: metadata.ContentDisposition,
          ContentEncoding: metadata.ContentEncoding,
          ContentLanguage: metadata.ContentLanguage,
          ContentType: metadata.ContentType,
          CopySource: getCopySource(config.bucket, key),
          Expires: metadata.Expires,
          Key: key,
          Metadata: metadata.Metadata,
          MetadataDirective: 'REPLACE',
        }),
      )
    }),
  )
}
