// fallow-ignore-file
import { sql } from '@payloadcms/db-vercel-postgres'
import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_feature_highlights_items_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_feature_highlights_items_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    ALTER TABLE "pages_blocks_feature_highlights_items"
      ADD COLUMN IF NOT EXISTS "enable_link" boolean DEFAULT false;
    ALTER TABLE "pages_blocks_feature_highlights_items"
      ADD COLUMN IF NOT EXISTS "link_type" "public"."enum_pages_blocks_feature_highlights_items_link_type" DEFAULT 'reference';
    ALTER TABLE "pages_blocks_feature_highlights_items"
      ADD COLUMN IF NOT EXISTS "link_new_tab" boolean;
    ALTER TABLE "pages_blocks_feature_highlights_items"
      ADD COLUMN IF NOT EXISTS "link_url" varchar;

    ALTER TABLE "_pages_v_blocks_feature_highlights_items"
      ADD COLUMN IF NOT EXISTS "enable_link" boolean DEFAULT false;
    ALTER TABLE "_pages_v_blocks_feature_highlights_items"
      ADD COLUMN IF NOT EXISTS "link_type" "public"."enum__pages_v_blocks_feature_highlights_items_link_type" DEFAULT 'reference';
    ALTER TABLE "_pages_v_blocks_feature_highlights_items"
      ADD COLUMN IF NOT EXISTS "link_new_tab" boolean;
    ALTER TABLE "_pages_v_blocks_feature_highlights_items"
      ADD COLUMN IF NOT EXISTS "link_url" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_feature_highlights_items" DROP COLUMN IF EXISTS "enable_link";
    ALTER TABLE "pages_blocks_feature_highlights_items" DROP COLUMN IF EXISTS "link_type";
    ALTER TABLE "pages_blocks_feature_highlights_items" DROP COLUMN IF EXISTS "link_new_tab";
    ALTER TABLE "pages_blocks_feature_highlights_items" DROP COLUMN IF EXISTS "link_url";

    ALTER TABLE "_pages_v_blocks_feature_highlights_items" DROP COLUMN IF EXISTS "enable_link";
    ALTER TABLE "_pages_v_blocks_feature_highlights_items" DROP COLUMN IF EXISTS "link_type";
    ALTER TABLE "_pages_v_blocks_feature_highlights_items" DROP COLUMN IF EXISTS "link_new_tab";
    ALTER TABLE "_pages_v_blocks_feature_highlights_items" DROP COLUMN IF EXISTS "link_url";

    DROP TYPE IF EXISTS "public"."enum_pages_blocks_feature_highlights_items_link_type";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_feature_highlights_items_link_type";
  `)
}
