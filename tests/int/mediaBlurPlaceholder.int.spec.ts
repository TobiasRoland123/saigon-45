import sharp from 'sharp'
import { describe, expect, it, vi } from 'vitest'

import { generateBlurPlaceholder } from '@/collections/Media'

type GenerateBlurPlaceholderArgs = Parameters<typeof generateBlurPlaceholder>[0]

const createHookArgs = async ({
  mimetype,
  operation = 'create',
}: {
  mimetype: string
  operation?: 'create' | 'update'
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
      file: {
        data: image,
        mimetype,
        name: 'test.png',
        size: image.byteLength,
      },
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

  it('skips updates so only new uploads are generated automatically', async () => {
    const args = await createHookArgs({ mimetype: 'image/png', operation: 'update' })
    const result = await generateBlurPlaceholder(asHookArgs(args))

    expect(result).toBe(args.data)
  })
})
