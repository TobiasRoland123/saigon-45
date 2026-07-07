import * as migration_20260409_155721_initial from './20260409_155721_initial'
import * as migration_20260701_000000_add_media_blur_placeholder from './20260701_000000_add_media_blur_placeholder'
import * as migration_20260701_122522 from './20260701_122522'
import * as migration_20260703_191909 from './20260703_191909'
import * as migration_20260703_215908_feature_highlights_block from './20260703_215908_feature_highlights_block'
import * as migration_20260704_205136 from './20260704_205136'
import * as migration_20260707_082606_side_by_side_content_block from './20260707_082606_side_by_side_content_block'

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
  {
    up: migration_20260701_122522.up,
    down: migration_20260701_122522.down,
    name: '20260701_122522',
  },
  {
    up: migration_20260703_191909.up,
    down: migration_20260703_191909.down,
    name: '20260703_191909',
  },
  {
    up: migration_20260703_215908_feature_highlights_block.up,
    down: migration_20260703_215908_feature_highlights_block.down,
    name: '20260703_215908_feature_highlights_block',
  },
  {
    up: migration_20260704_205136.up,
    down: migration_20260704_205136.down,
    name: '20260704_205136',
  },
  {
    up: migration_20260707_082606_side_by_side_content_block.up,
    down: migration_20260707_082606_side_by_side_content_block.down,
    name: '20260707_082606_side_by_side_content_block',
  },
]
