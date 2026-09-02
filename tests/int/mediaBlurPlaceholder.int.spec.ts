import sharp from 'sharp'
import { describe, expect, it, vi } from 'vitest'

import { generateBlurPlaceholder } from '@/collections/Media'

type GenerateBlurPlaceholderArgs = Parameters<typeof generateBlurPlaceholder>[0]

const createHookArgs = async ({
  mimetype,
  operation = 'create',
  withFile = true,
}: {
  mimetype?: string
  operation?: 'create' | 'update'
  withFile?: boolean
}) => {
  const data = { alt: 'Test image' }
  const image = await sharp({
    create: {
      background: '#c2410c',
      channels: 3,
      height: 32,
      width: 32,
    },
  })
    .png()
    .toBuffer()

  return {
    data,
    operation,
    req: {
      // Payload only populates `req.file` when a file is actually uploaded, so
      // a metadata-only edit leaves it undefined.
      file: withFile
        ? {
            data: image,
            mimetype,
            name: 'test.png',
            size: image.byteLength,
          }
        : undefined,
      payload: {
        logger: {
          warn: vi.fn(),
        },
      },
    },
  }
}

const asHookArgs = (
  args: Awaited<ReturnType<typeof createHookArgs>>,
): GenerateBlurPlaceholderArgs => args as unknown as GenerateBlurPlaceholderArgs

describe('generateBlurPlaceholder', () => {
  it('generates a blur placeholder for new image uploads', async () => {
    const args = await createHookArgs({ mimetype: 'image/png' })
    const result = await generateBlurPlaceholder(asHookArgs(args))

    expect(result).toMatchObject({
      alt: 'Test image',
      blurPlaceholder: expect.stringMatching(/^data:image\/webp;base64,/),
    })
  })

  it('skips non-image uploads', async () => {
    const args = await createHookArgs({ mimetype: 'application/pdf' })
    const result = await generateBlurPlaceholder(asHookArgs(args))

    expect(result).toBe(args.data)
  })

  it('regenerates the placeholder when an update replaces the file', async () => {
    const args = await createHookArgs({ mimetype: 'image/png', operation: 'update' })
    const result = await generateBlurPlaceholder(asHookArgs(args))

    // The hook keys off an uploaded file rather than the operation, so
    // swapping the image on an existing record refreshes its placeholder.
    expect(result).toMatchObject({
      alt: 'Test image',
      blurPlaceholder: expect.stringMatching(/^data:image\/webp;base64,/),
    })
  })

  it('skips edits that upload no file', async () => {
    const args = await createHookArgs({ operation: 'update', withFile: false })
    const result = await generateBlurPlaceholder(asHookArgs(args))

    expect(result).toBe(args.data)
  })
})
