import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_menu_highlights_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_menu_highlights_cards_link_type" AS ENUM('reference', 'custom');
  ALTER TYPE "public"."enum_pages_hero_info_items_icon" ADD VALUE 'quote';
  ALTER TYPE "public"."enum_pages_blocks_feature_highlights_items_icon" ADD VALUE 'quote';
  ALTER TYPE "public"."enum_pages_blocks_reviews_rating_icon" ADD VALUE 'quote';
  ALTER TYPE "public"."enum_pages_blocks_reviews_smiley_icon" ADD VALUE 'quote';
  ALTER TYPE "public"."enum__pages_v_version_hero_info_items_icon" ADD VALUE 'quote';
  ALTER TYPE "public"."enum__pages_v_blocks_feature_highlights_items_icon" ADD VALUE 'quote';
  ALTER TYPE "public"."enum__pages_v_blocks_reviews_rating_icon" ADD VALUE 'quote';
  ALTER TYPE "public"."enum__pages_v_blocks_reviews_smiley_icon" ADD VALUE 'quote';
  CREATE TABLE "pages_blocks_menu_highlights_cards" (
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
  
  CREATE TABLE "pages_blocks_menu_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Hvad har du lyst til?',
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_menu_highlights_cards" (
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
  
  CREATE TABLE "_pages_v_blocks_menu_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Hvad har du lyst til?',
  	"intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_menu_highlights_cards" ADD CONSTRAINT "pages_blocks_menu_highlights_cards_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_menu_highlights_cards" ADD CONSTRAINT "pages_blocks_menu_highlights_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_menu_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_menu_highlights" ADD CONSTRAINT "pages_blocks_menu_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_menu_highlights_cards" ADD CONSTRAINT "_pages_v_blocks_menu_highlights_cards_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_menu_highlights_cards" ADD CONSTRAINT "_pages_v_blocks_menu_highlights_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_menu_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_menu_highlights" ADD CONSTRAINT "_pages_v_blocks_menu_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_menu_highlights_cards_order_idx" ON "pages_blocks_menu_highlights_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_menu_highlights_cards_parent_id_idx" ON "pages_blocks_menu_highlights_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_menu_highlights_cards_media_idx" ON "pages_blocks_menu_highlights_cards" USING btree ("media_id");
  CREATE INDEX "pages_blocks_menu_highlights_order_idx" ON "pages_blocks_menu_highlights" USING btree ("_order");
  CREATE INDEX "pages_blocks_menu_highlights_parent_id_idx" ON "pages_blocks_menu_highlights" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_menu_highlights_path_idx" ON "pages_blocks_menu_highlights" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_menu_highlights_cards_order_idx" ON "_pages_v_blocks_menu_highlights_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_menu_highlights_cards_parent_id_idx" ON "_pages_v_blocks_menu_highlights_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_menu_highlights_cards_media_idx" ON "_pages_v_blocks_menu_highlights_cards" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_menu_highlights_order_idx" ON "_pages_v_blocks_menu_highlights" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_menu_highlights_parent_id_idx" ON "_pages_v_blocks_menu_highlights" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_menu_highlights_path_idx" ON "_pages_v_blocks_menu_highlights" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_menu_highlights_cards" CASCADE;
  DROP TABLE "pages_blocks_menu_highlights" CASCADE;
  DROP TABLE "_pages_v_blocks_menu_highlights_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_menu_highlights" CASCADE;
  ALTER TABLE "pages_hero_info_items" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_hero_info_items_icon";
  CREATE TYPE "public"."enum_pages_hero_info_items_icon" AS ENUM('arrowLeft', 'arrowRight', 'clock', 'mapPin', 'phone', 'badgeCheck', 'leaf', 'search', 'star');
  ALTER TABLE "pages_hero_info_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_pages_hero_info_items_icon" USING "icon"::"public"."enum_pages_hero_info_items_icon";
  ALTER TABLE "pages_blocks_feature_highlights_items" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_feature_highlights_items_icon";
  CREATE TYPE "public"."enum_pages_blocks_feature_highlights_items_icon" AS ENUM('arrowLeft', 'arrowRight', 'clock', 'mapPin', 'phone', 'badgeCheck', 'leaf', 'search', 'star');
  ALTER TABLE "pages_blocks_feature_highlights_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_pages_blocks_feature_highlights_items_icon" USING "icon"::"public"."enum_pages_blocks_feature_highlights_items_icon";
  ALTER TABLE "pages_blocks_reviews" ALTER COLUMN "rating_icon" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_reviews" ALTER COLUMN "rating_icon" SET DEFAULT 'star'::text;
  DROP TYPE "public"."enum_pages_blocks_reviews_rating_icon";
  CREATE TYPE "public"."enum_pages_blocks_reviews_rating_icon" AS ENUM('arrowLeft', 'arrowRight', 'clock', 'mapPin', 'phone', 'badgeCheck', 'leaf', 'search', 'star');
  ALTER TABLE "pages_blocks_reviews" ALTER COLUMN "rating_icon" SET DEFAULT 'star'::"public"."enum_pages_blocks_reviews_rating_icon";
  ALTER TABLE "pages_blocks_reviews" ALTER COLUMN "rating_icon" SET DATA TYPE "public"."enum_pages_blocks_reviews_rating_icon" USING "rating_icon"::"public"."enum_pages_blocks_reviews_rating_icon";
  ALTER TABLE "pages_blocks_reviews" ALTER COLUMN "smiley_icon" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_reviews" ALTER COLUMN "smiley_icon" SET DEFAULT 'badgeCheck'::text;
  DROP TYPE "public"."enum_pages_blocks_reviews_smiley_icon";
  CREATE TYPE "public"."enum_pages_blocks_reviews_smiley_icon" AS ENUM('arrowLeft', 'arrowRight', 'clock', 'mapPin', 'phone', 'badgeCheck', 'leaf', 'search', 'star');
  ALTER TABLE "pages_blocks_reviews" ALTER COLUMN "smiley_icon" SET DEFAULT 'badgeCheck'::"public"."enum_pages_blocks_reviews_smiley_icon";
  ALTER TABLE "pages_blocks_reviews" ALTER COLUMN "smiley_icon" SET DATA TYPE "public"."enum_pages_blocks_reviews_smiley_icon" USING "smiley_icon"::"public"."enum_pages_blocks_reviews_smiley_icon";
  ALTER TABLE "_pages_v_version_hero_info_items" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_version_hero_info_items_icon";
  CREATE TYPE "public"."enum__pages_v_version_hero_info_items_icon" AS ENUM('arrowLeft', 'arrowRight', 'clock', 'mapPin', 'phone', 'badgeCheck', 'leaf', 'search', 'star');
  ALTER TABLE "_pages_v_version_hero_info_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__pages_v_version_hero_info_items_icon" USING "icon"::"public"."enum__pages_v_version_hero_info_items_icon";
  ALTER TABLE "_pages_v_blocks_feature_highlights_items" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_feature_highlights_items_icon";
  CREATE TYPE "public"."enum__pages_v_blocks_feature_highlights_items_icon" AS ENUM('arrowLeft', 'arrowRight', 'clock', 'mapPin', 'phone', 'badgeCheck', 'leaf', 'search', 'star');
  ALTER TABLE "_pages_v_blocks_feature_highlights_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__pages_v_blocks_feature_highlights_items_icon" USING "icon"::"public"."enum__pages_v_blocks_feature_highlights_items_icon";
  ALTER TABLE "_pages_v_blocks_reviews" ALTER COLUMN "rating_icon" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_reviews" ALTER COLUMN "rating_icon" SET DEFAULT 'star'::text;
  DROP TYPE "public"."enum__pages_v_blocks_reviews_rating_icon";
  CREATE TYPE "public"."enum__pages_v_blocks_reviews_rating_icon" AS ENUM('arrowLeft', 'arrowRight', 'clock', 'mapPin', 'phone', 'badgeCheck', 'leaf', 'search', 'star');
  ALTER TABLE "_pages_v_blocks_reviews" ALTER COLUMN "rating_icon" SET DEFAULT 'star'::"public"."enum__pages_v_blocks_reviews_rating_icon";
  ALTER TABLE "_pages_v_blocks_reviews" ALTER COLUMN "rating_icon" SET DATA TYPE "public"."enum__pages_v_blocks_reviews_rating_icon" USING "rating_icon"::"public"."enum__pages_v_blocks_reviews_rating_icon";
  ALTER TABLE "_pages_v_blocks_reviews" ALTER COLUMN "smiley_icon" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_reviews" ALTER COLUMN "smiley_icon" SET DEFAULT 'badgeCheck'::text;
  DROP TYPE "public"."enum__pages_v_blocks_reviews_smiley_icon";
  CREATE TYPE "public"."enum__pages_v_blocks_reviews_smiley_icon" AS ENUM('arrowLeft', 'arrowRight', 'clock', 'mapPin', 'phone', 'badgeCheck', 'leaf', 'search', 'star');
  ALTER TABLE "_pages_v_blocks_reviews" ALTER COLUMN "smiley_icon" SET DEFAULT 'badgeCheck'::"public"."enum__pages_v_blocks_reviews_smiley_icon";
  ALTER TABLE "_pages_v_blocks_reviews" ALTER COLUMN "smiley_icon" SET DATA TYPE "public"."enum__pages_v_blocks_reviews_smiley_icon" USING "smiley_icon"::"public"."enum__pages_v_blocks_reviews_smiley_icon";
  DROP TYPE "public"."enum_pages_blocks_menu_highlights_cards_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_menu_highlights_cards_link_type";`)
}
