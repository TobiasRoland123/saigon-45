import * as migration_20260409_155721_initial from './20260409_155721_initial'
import * as migration_20260701_000000_add_media_blur_placeholder from './20260701_000000_add_media_blur_placeholder'

export const migrations = [
  {
    up: migration_20260409_155721_initial.up,
    down: migration_20260409_155721_initial.down,
    name: '20260409_155721_initial',
  },
  {
    up: migration_20260701_000000_add_media_blur_placeholder.up,
    down: migration_20260701_000000_add_media_blur_placeholder.down,
    name: '20260701_000000_add_media_blur_placeholder',
  },
]
