import * as migration_20260409_155721_initial from './20260409_155721_initial'
import * as migration_20260701_122522 from './20260701_122522'
import * as migration_20260703_215908_feature_highlights_block from './20260703_215908_feature_highlights_block'

export const migrations = [
  {
    up: migration_20260409_155721_initial.up,
    down: migration_20260409_155721_initial.down,
    name: '20260409_155721_initial',
  },
  {
    up: migration_20260701_122522.up,
    down: migration_20260701_122522.down,
    name: '20260701_122522',
  },
  {
    up: migration_20260703_215908_feature_highlights_block.up,
    down: migration_20260703_215908_feature_highlights_block.down,
    name: '20260703_215908_feature_highlights_block',
  },
]
