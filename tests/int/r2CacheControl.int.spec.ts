import { CopyObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  applyR2MediaCacheControl,
  getMediaObjectKeys,
  R2_MEDIA_CACHE_CONTROL,
} from '@/utilities/r2CacheControl'

const r2Environment = {
  R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
  R2_BUCKET: process.env.R2_BUCKET,
  R2_ENDPOINT: process.env.R2_ENDPOINT,
  R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
}

const restoreEnvironmentVariable = (name: keyof typeof r2Environment) => {
  const value = r2Environment[name]

  if (value === undefined) {
    Reflect.deleteProperty(process.env, name)
  } else {
    process.env[name] = value
  }
}

describe('R2 media cache control', () => {
  beforeEach(() => {
    process.env.R2_ACCESS_KEY_ID = 'access-key'
    process.env.R2_BUCKET = 'media-bucket'
    process.env.R2_ENDPOINT = 'https://example.r2.cloudflarestorage.com'
    process.env.R2_SECRET_ACCESS_KEY = 'secret-key'
  })

  afterEach(() => {
    vi.restoreAllMocks()
    Object.keys(r2Environment).forEach((name) =>
      restoreEnvironmentVariable(name as keyof typeof r2Environment),
    )
  })

  it('uses a one-year immutable browser cache policy', () => {
    expect(R2_MEDIA_CACHE_CONTROL).toBe('public, max-age=31536000, immutable')
  })

  it('collects the original and generated image keys', () => {
    expect(
      getMediaObjectKeys({
        filename: 'hero.webp',
        prefix: 'homepage',
        sizes: {
          medium: { filename: 'hero-900x506.webp' },
          thumbnail: { filename: 'hero-300x169.webp' },
        },
      }),
    ).toEqual(['homepage/hero.webp', 'homepage/hero-900x506.webp', 'homepage/hero-300x169.webp'])
  })

  it('ignores empty and duplicate filenames', () => {
    expect(
      getMediaObjectKeys({
        filename: 'image.webp',
        sizes: {
          empty: null,
          original: { filename: 'image.webp' },
        },
      }),
    ).toEqual(['image.webp'])
  })

  it('preserves object metadata while adding the cache policy', async () => {
    const send = vi
      .spyOn(S3Client.prototype, 'send')
      .mockResolvedValueOnce({
        ContentDisposition: 'inline',
        ContentType: 'image/webp',
        Metadata: { source: 'payload' },
      } as never)
      .mockResolvedValueOnce({} as never)

    await applyR2MediaCacheControl({ filename: 'hero image.webp', prefix: 'homepage' })

    expect(send).toHaveBeenCalledTimes(2)

    const copyCommand = send.mock.calls[1]?.[0]
    expect(copyCommand).toBeInstanceOf(CopyObjectCommand)
    expect((copyCommand as CopyObjectCommand).input).toMatchObject({
      Bucket: 'media-bucket',
      CacheControl: R2_MEDIA_CACHE_CONTROL,
      ContentDisposition: 'inline',
      ContentType: 'image/webp',
      CopySource: 'media-bucket/homepage/hero%20image.webp',
      Key: 'homepage/hero image.webp',
      Metadata: { source: 'payload' },
      MetadataDirective: 'REPLACE',
    })
  })

  it('does not rewrite an object that already has the cache policy', async () => {
    const send = vi
      .spyOn(S3Client.prototype, 'send')
      .mockResolvedValueOnce({ CacheControl: R2_MEDIA_CACHE_CONTROL } as never)

    await applyR2MediaCacheControl({ filename: 'hero.webp' })

    expect(send).toHaveBeenCalledOnce()
  })
})
