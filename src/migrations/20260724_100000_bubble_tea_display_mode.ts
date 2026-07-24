import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_bubble_tea_mode" AS ENUM('highlight', 'full');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_bubble_tea_view_all_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_bubble_tea_mode" AS ENUM('highlight', 'full');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_bubble_tea_view_all_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    ALTER TABLE "pages_blocks_bubble_tea" ADD COLUMN IF NOT EXISTS "mode" "enum_pages_blocks_bubble_tea_mode" DEFAULT 'highlight';
    ALTER TABLE "pages_blocks_bubble_tea" ADD COLUMN IF NOT EXISTS "view_all_type" "enum_pages_blocks_bubble_tea_view_all_type" DEFAULT 'reference';
    ALTER TABLE "pages_blocks_bubble_tea" ADD COLUMN IF NOT EXISTS "view_all_new_tab" boolean;
    ALTER TABLE "pages_blocks_bubble_tea" ADD COLUMN IF NOT EXISTS "view_all_url" varchar;
    ALTER TABLE "pages_blocks_bubble_tea" ADD COLUMN IF NOT EXISTS "view_all_label" varchar;
    ALTER TABLE "_pages_v_blocks_bubble_tea" ADD COLUMN IF NOT EXISTS "mode" "enum__pages_v_blocks_bubble_tea_mode" DEFAULT 'highlight';
    ALTER TABLE "_pages_v_blocks_bubble_tea" ADD COLUMN IF NOT EXISTS "view_all_type" "enum__pages_v_blocks_bubble_tea_view_all_type" DEFAULT 'reference';
    ALTER TABLE "_pages_v_blocks_bubble_tea" ADD COLUMN IF NOT EXISTS "view_all_new_tab" boolean;
    ALTER TABLE "_pages_v_blocks_bubble_tea" ADD COLUMN IF NOT EXISTS "view_all_url" varchar;
    ALTER TABLE "_pages_v_blocks_bubble_tea" ADD COLUMN IF NOT EXISTS "view_all_label" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_bubble_tea" DROP COLUMN IF EXISTS "mode";
    ALTER TABLE "pages_blocks_bubble_tea" DROP COLUMN IF EXISTS "view_all_type";
    ALTER TABLE "pages_blocks_bubble_tea" DROP COLUMN IF EXISTS "view_all_new_tab";
    ALTER TABLE "pages_blocks_bubble_tea" DROP COLUMN IF EXISTS "view_all_url";
    ALTER TABLE "pages_blocks_bubble_tea" DROP COLUMN IF EXISTS "view_all_label";
    ALTER TABLE "_pages_v_blocks_bubble_tea" DROP COLUMN IF EXISTS "mode";
    ALTER TABLE "_pages_v_blocks_bubble_tea" DROP COLUMN IF EXISTS "view_all_type";
    ALTER TABLE "_pages_v_blocks_bubble_tea" DROP COLUMN IF EXISTS "view_all_new_tab";
    ALTER TABLE "_pages_v_blocks_bubble_tea" DROP COLUMN IF EXISTS "view_all_url";
    ALTER TABLE "_pages_v_blocks_bubble_tea" DROP COLUMN IF EXISTS "view_all_label";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_bubble_tea_mode";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_bubble_tea_view_all_type";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_bubble_tea_mode";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_bubble_tea_view_all_type";
  `)
}
