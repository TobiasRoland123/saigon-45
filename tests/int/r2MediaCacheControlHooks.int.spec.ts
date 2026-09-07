import { beforeEach, describe, expect, it, vi } from 'vitest'

const { applyR2MediaCacheControl } = vi.hoisted(() => ({
  applyR2MediaCacheControl: vi.fn(),
}))

vi.mock('@/utilities/r2CacheControl', () => ({ applyR2MediaCacheControl }))

import { markR2MediaUpload, setR2MediaCacheControl } from '@/collections/Media'

const createRequest = (withFile: boolean) => ({
  context: {},
  file: withFile ? { name: 'hero.webp' } : undefined,
  payload: { logger: { warn: vi.fn() } },
})

describe('R2 media cache-control hooks', () => {
  beforeEach(() => {
    applyR2MediaCacheControl.mockReset()
  })

  it('applies metadata after a file upload even when the storage hook clears req.file', async () => {
    const req = createRequest(true)
    const result = { filename: 'hero.webp', id: 1 }

    markR2MediaUpload({ req } as never)
    req.file = undefined
    await setR2MediaCacheControl({ req, result } as never)

    expect(applyR2MediaCacheControl).toHaveBeenCalledOnce()
    expect(applyR2MediaCacheControl).toHaveBeenCalledWith(result)

    await setR2MediaCacheControl({ req, result } as never)
    expect(applyR2MediaCacheControl).toHaveBeenCalledOnce()
  })

  it('skips metadata-only updates', async () => {
    const req = createRequest(false)

    markR2MediaUpload({ req } as never)
    await setR2MediaCacheControl({ req, result: { filename: 'hero.webp', id: 1 } } as never)

    expect(applyR2MediaCacheControl).not.toHaveBeenCalled()
  })
})
