import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_reviews_rating_icon" AS ENUM('arrowLeft', 'arrowRight', 'clock', 'mapPin', 'phone', 'badgeCheck', 'leaf', 'search', 'star');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_reviews_smiley_icon" AS ENUM('arrowLeft', 'arrowRight', 'clock', 'mapPin', 'phone', 'badgeCheck', 'leaf', 'search', 'star');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_split_content_primary_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_split_content_primary_link_appearance" AS ENUM('default');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_reviews_rating_icon" AS ENUM('arrowLeft', 'arrowRight', 'clock', 'mapPin', 'phone', 'badgeCheck', 'leaf', 'search', 'star');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_reviews_smiley_icon" AS ENUM('arrowLeft', 'arrowRight', 'clock', 'mapPin', 'phone', 'badgeCheck', 'leaf', 'search', 'star');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_split_content_primary_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_split_content_primary_link_appearance" AS ENUM('default');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    CREATE TABLE IF NOT EXISTS "pages_blocks_split_content_features" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_split_content" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "description" varchar,
      "primary_link_type" "enum_pages_blocks_split_content_primary_link_type" DEFAULT 'reference',
      "primary_link_new_tab" boolean,
      "primary_link_url" varchar,
      "primary_link_label" varchar,
      "primary_link_appearance" "enum_pages_blocks_split_content_primary_link_appearance" DEFAULT 'default',
      "media_id" integer,
      "image_callout" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_split_content_features" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "label" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_split_content" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "description" varchar,
      "primary_link_type" "enum__pages_v_blocks_split_content_primary_link_type" DEFAULT 'reference',
      "primary_link_new_tab" boolean,
      "primary_link_url" varchar,
      "primary_link_label" varchar,
      "primary_link_appearance" "enum__pages_v_blocks_split_content_primary_link_appearance" DEFAULT 'default',
      "media_id" integer,
      "image_callout" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );

    ALTER TABLE "pages_blocks_reviews" ADD COLUMN IF NOT EXISTS "rating_icon" "enum_pages_blocks_reviews_rating_icon" DEFAULT 'star';
    ALTER TABLE "pages_blocks_reviews" ADD COLUMN IF NOT EXISTS "smiley_icon" "enum_pages_blocks_reviews_smiley_icon" DEFAULT 'badgeCheck';
    ALTER TABLE "_pages_v_blocks_reviews" ADD COLUMN IF NOT EXISTS "rating_icon" "enum__pages_v_blocks_reviews_rating_icon" DEFAULT 'star';
    ALTER TABLE "_pages_v_blocks_reviews" ADD COLUMN IF NOT EXISTS "smiley_icon" "enum__pages_v_blocks_reviews_smiley_icon" DEFAULT 'badgeCheck';

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_split_content_features" ADD CONSTRAINT "pages_blocks_split_content_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_split_content"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_split_content" ADD CONSTRAINT "pages_blocks_split_content_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_split_content" ADD CONSTRAINT "pages_blocks_split_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_split_content_features" ADD CONSTRAINT "_pages_v_blocks_split_content_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_split_content"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_split_content" ADD CONSTRAINT "_pages_v_blocks_split_content_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_split_content" ADD CONSTRAINT "_pages_v_blocks_split_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    CREATE INDEX IF NOT EXISTS "pages_blocks_split_content_features_order_idx" ON "pages_blocks_split_content_features" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_split_content_features_parent_id_idx" ON "pages_blocks_split_content_features" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_split_content_order_idx" ON "pages_blocks_split_content" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_split_content_parent_id_idx" ON "pages_blocks_split_content" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_split_content_path_idx" ON "pages_blocks_split_content" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_split_content_media_idx" ON "pages_blocks_split_content" USING btree ("media_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_split_content_features_order_idx" ON "_pages_v_blocks_split_content_features" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_split_content_features_parent_id_idx" ON "_pages_v_blocks_split_content_features" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_split_content_order_idx" ON "_pages_v_blocks_split_content" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_split_content_parent_id_idx" ON "_pages_v_blocks_split_content" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_split_content_path_idx" ON "_pages_v_blocks_split_content" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_split_content_media_idx" ON "_pages_v_blocks_split_content" USING btree ("media_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "pages_blocks_split_content_features" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_split_content" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_split_content_features" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_split_content" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_split_content_primary_link_type";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_split_content_primary_link_appearance";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_split_content_primary_link_type";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_split_content_primary_link_appearance";
  `)
}
