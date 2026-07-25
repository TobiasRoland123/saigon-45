import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { get, head, list } from '@vercel/blob'

const requiredEnvironmentVariables = [
  'BLOB_READ_WRITE_TOKEN',
  'R2_BUCKET',
  'R2_ACCESS_KEY_ID',
  'R2_SECRET_ACCESS_KEY',
  'R2_ENDPOINT',
] as const

for (const name of requiredEnvironmentVariables) {
  if (!process.env[name]) {
    throw new Error(`${name} must be set before migrating media to R2.`)
  }
}

const client = new S3Client({
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
  endpoint: process.env.R2_ENDPOINT,
  forcePathStyle: true,
  region: 'auto',
})

let cursor: string | undefined
let migratedCount = 0

do {
  const result = await list({
    cursor,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  })

  for (const blob of result.blobs) {
    const [source, metadata] = await Promise.all([
      get(blob.url, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
      }),
      head(blob.url, { token: process.env.BLOB_READ_WRITE_TOKEN }),
    ])

    if (!source || source.statusCode !== 200) {
      throw new Error(`Could not download ${blob.pathname} from Vercel Blob.`)
    }

    await client.send(
      new PutObjectCommand({
        Body: source.stream,
        Bucket: process.env.R2_BUCKET,
        CacheControl: metadata.cacheControl,
        ContentDisposition: metadata.contentDisposition,
        ContentType: metadata.contentType,
        Key: blob.pathname,
      }),
    )

    migratedCount += 1
    process.stdout.write(`Migrated ${blob.pathname}\n`)
  }

  cursor = result.hasMore ? result.cursor : undefined
} while (cursor)

process.stdout.write(`Migrated ${migratedCount} Vercel Blob object(s) to R2.\n`)
