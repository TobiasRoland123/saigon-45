// fallow-ignore-file
import { sql } from '@payloadcms/db-vercel-postgres'
import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_feature_highlights" ADD COLUMN IF NOT EXISTS "add_top_margin" boolean DEFAULT false;
    ALTER TABLE "_pages_v_blocks_feature_highlights" ADD COLUMN IF NOT EXISTS "add_top_margin" boolean DEFAULT false;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_feature_highlights" DROP COLUMN IF EXISTS "add_top_margin";
    ALTER TABLE "_pages_v_blocks_feature_highlights" DROP COLUMN IF EXISTS "add_top_margin";
  `)
}
