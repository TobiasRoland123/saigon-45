import * as migration_20260409_155721_initial from './20260409_155721_initial'
import * as migration_20260701_122522 from './20260701_122522'

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
]
