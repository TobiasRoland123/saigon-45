import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_menu_highlights_cards_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_menu_highlights_cards_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    CREATE TABLE IF NOT EXISTS "pages_blocks_menu_highlights_cards" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "media_id" integer,
      "image_label" varchar,
      "badge" varchar,
      "title" varchar,
      "description" varchar,
      "link_type" "enum_pages_blocks_menu_highlights_cards_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_menu_highlights" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "heading" varchar DEFAULT 'Hvad har du lyst til?',
      "intro" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_menu_highlights_cards" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "media_id" integer,
      "image_label" varchar,
      "badge" varchar,
      "title" varchar,
      "description" varchar,
      "link_type" "enum__pages_v_blocks_menu_highlights_cards_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_menu_highlights" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "heading" varchar DEFAULT 'Hvad har du lyst til?',
      "intro" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );

    ALTER TABLE "pages_blocks_menu_highlights_cards"
      ADD CONSTRAINT "pages_blocks_menu_highlights_cards_media_id_media_id_fk"
      FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "pages_blocks_menu_highlights_cards"
      ADD CONSTRAINT "pages_blocks_menu_highlights_cards_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_menu_highlights"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "pages_blocks_menu_highlights"
      ADD CONSTRAINT "pages_blocks_menu_highlights_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "_pages_v_blocks_menu_highlights_cards"
      ADD CONSTRAINT "_pages_v_blocks_menu_highlights_cards_media_id_media_id_fk"
      FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_pages_v_blocks_menu_highlights_cards"
      ADD CONSTRAINT "_pages_v_blocks_menu_highlights_cards_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_menu_highlights"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "_pages_v_blocks_menu_highlights"
      ADD CONSTRAINT "_pages_v_blocks_menu_highlights_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;

    CREATE INDEX IF NOT EXISTS "pages_blocks_menu_highlights_cards_order_idx" ON "pages_blocks_menu_highlights_cards" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_menu_highlights_cards_parent_id_idx" ON "pages_blocks_menu_highlights_cards" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_menu_highlights_cards_media_idx" ON "pages_blocks_menu_highlights_cards" USING btree ("media_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_menu_highlights_order_idx" ON "pages_blocks_menu_highlights" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_menu_highlights_parent_id_idx" ON "pages_blocks_menu_highlights" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_menu_highlights_path_idx" ON "pages_blocks_menu_highlights" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_menu_highlights_cards_order_idx" ON "_pages_v_blocks_menu_highlights_cards" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_menu_highlights_cards_parent_id_idx" ON "_pages_v_blocks_menu_highlights_cards" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_menu_highlights_cards_media_idx" ON "_pages_v_blocks_menu_highlights_cards" USING btree ("media_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_menu_highlights_order_idx" ON "_pages_v_blocks_menu_highlights" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_menu_highlights_parent_id_idx" ON "_pages_v_blocks_menu_highlights" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_menu_highlights_path_idx" ON "_pages_v_blocks_menu_highlights" USING btree ("_path");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "pages_blocks_menu_highlights_cards" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_menu_highlights" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_menu_highlights_cards" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_menu_highlights" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_menu_highlights_cards_link_type";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_menu_highlights_cards_link_type";
  `)
}
