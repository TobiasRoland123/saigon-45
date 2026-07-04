import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_feature_highlights_items_icon" AS ENUM('clock', 'mapPin', 'phone', 'badgeCheck', 'leaf', 'search', 'star');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_highlights_items_icon" AS ENUM('clock', 'mapPin', 'phone', 'badgeCheck', 'leaf', 'search', 'star');
  ALTER TYPE "public"."enum_pages_hero_info_items_icon" ADD VALUE 'badgeCheck' BEFORE 'search';
  ALTER TYPE "public"."enum_pages_hero_info_items_icon" ADD VALUE 'leaf' BEFORE 'search';
  ALTER TYPE "public"."enum_pages_hero_info_items_icon" ADD VALUE 'star';
  ALTER TYPE "public"."enum__pages_v_version_hero_info_items_icon" ADD VALUE 'badgeCheck' BEFORE 'search';
  ALTER TYPE "public"."enum__pages_v_version_hero_info_items_icon" ADD VALUE 'leaf' BEFORE 'search';
  ALTER TYPE "public"."enum__pages_v_version_hero_info_items_icon" ADD VALUE 'star';
  CREATE TABLE "pages_blocks_feature_highlights_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_feature_highlights_items_icon",
  	"title" varchar,
  	"subtitle" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_highlights_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_feature_highlights_items_icon",
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_feature_highlights_items" ADD CONSTRAINT "pages_blocks_feature_highlights_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_highlights" ADD CONSTRAINT "pages_blocks_feature_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_highlights_items" ADD CONSTRAINT "_pages_v_blocks_feature_highlights_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_highlights" ADD CONSTRAINT "_pages_v_blocks_feature_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_feature_highlights_items_order_idx" ON "pages_blocks_feature_highlights_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_highlights_items_parent_id_idx" ON "pages_blocks_feature_highlights_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_highlights_order_idx" ON "pages_blocks_feature_highlights" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_highlights_parent_id_idx" ON "pages_blocks_feature_highlights" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_highlights_path_idx" ON "pages_blocks_feature_highlights" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_feature_highlights_items_order_idx" ON "_pages_v_blocks_feature_highlights_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_highlights_items_parent_id_idx" ON "_pages_v_blocks_feature_highlights_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_highlights_order_idx" ON "_pages_v_blocks_feature_highlights" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_highlights_parent_id_idx" ON "_pages_v_blocks_feature_highlights" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_highlights_path_idx" ON "_pages_v_blocks_feature_highlights" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_feature_highlights_items" CASCADE;
  DROP TABLE "pages_blocks_feature_highlights" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_highlights_items" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_highlights" CASCADE;
  ALTER TABLE "pages_hero_info_items" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_hero_info_items_icon";
  CREATE TYPE "public"."enum_pages_hero_info_items_icon" AS ENUM('clock', 'mapPin', 'phone', 'search');
  ALTER TABLE "pages_hero_info_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_pages_hero_info_items_icon" USING "icon"::"public"."enum_pages_hero_info_items_icon";
  ALTER TABLE "_pages_v_version_hero_info_items" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_version_hero_info_items_icon";
  CREATE TYPE "public"."enum__pages_v_version_hero_info_items_icon" AS ENUM('clock', 'mapPin', 'phone', 'search');
  ALTER TABLE "_pages_v_version_hero_info_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__pages_v_version_hero_info_items_icon" USING "icon"::"public"."enum__pages_v_version_hero_info_items_icon";
  DROP TYPE "public"."enum_pages_blocks_feature_highlights_items_icon";
  DROP TYPE "public"."enum__pages_v_blocks_feature_highlights_items_icon";`)
}
