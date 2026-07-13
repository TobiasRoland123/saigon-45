import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

// Replaces the array-based opening-hours schema (one row per day, created by
// 20260707_081532__) with a fixed group per weekday, and adds the 'quote'
// icon to the icon enums. Existing schedule rows are dropped — re-enter the
// hours in the admin panel or re-run the seed afterwards.
//
// Hand-edited: the auto-generated diff also tried to CREATE the
// menu-highlights tables because the 20260710_173633 snapshot was missing
// them, but 20260707_200303 already created those in the database.

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "opening_hours_days" CASCADE;
  DROP TABLE IF EXISTS "opening_hours" CASCADE;
  DROP TYPE IF EXISTS "public"."enum_opening_hours_days_day";
  ALTER TYPE "public"."enum_pages_hero_info_items_icon" ADD VALUE IF NOT EXISTS 'quote';
  ALTER TYPE "public"."enum_pages_blocks_feature_highlights_items_icon" ADD VALUE IF NOT EXISTS 'quote';
  ALTER TYPE "public"."enum_pages_blocks_reviews_rating_icon" ADD VALUE IF NOT EXISTS 'quote';
  ALTER TYPE "public"."enum_pages_blocks_reviews_smiley_icon" ADD VALUE IF NOT EXISTS 'quote';
  ALTER TYPE "public"."enum__pages_v_version_hero_info_items_icon" ADD VALUE IF NOT EXISTS 'quote';
  ALTER TYPE "public"."enum__pages_v_blocks_feature_highlights_items_icon" ADD VALUE IF NOT EXISTS 'quote';
  ALTER TYPE "public"."enum__pages_v_blocks_reviews_rating_icon" ADD VALUE IF NOT EXISTS 'quote';
  ALTER TYPE "public"."enum__pages_v_blocks_reviews_smiley_icon" ADD VALUE IF NOT EXISTS 'quote';
  CREATE TABLE "opening_hours" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"address" varchar NOT NULL,
  	"address_url" varchar NOT NULL,
  	"days_monday_label" varchar DEFAULT 'Mandag' NOT NULL,
  	"days_monday_closed" boolean DEFAULT false,
  	"days_monday_opens_at" varchar DEFAULT '11:00',
  	"days_monday_closes_at" varchar DEFAULT '21:00',
  	"days_tuesday_label" varchar DEFAULT 'Tirsdag' NOT NULL,
  	"days_tuesday_closed" boolean DEFAULT false,
  	"days_tuesday_opens_at" varchar DEFAULT '11:00',
  	"days_tuesday_closes_at" varchar DEFAULT '21:00',
  	"days_wednesday_label" varchar DEFAULT 'Onsdag' NOT NULL,
  	"days_wednesday_closed" boolean DEFAULT false,
  	"days_wednesday_opens_at" varchar DEFAULT '11:00',
  	"days_wednesday_closes_at" varchar DEFAULT '21:00',
  	"days_thursday_label" varchar DEFAULT 'Torsdag' NOT NULL,
  	"days_thursday_closed" boolean DEFAULT false,
  	"days_thursday_opens_at" varchar DEFAULT '11:00',
  	"days_thursday_closes_at" varchar DEFAULT '21:00',
  	"days_friday_label" varchar DEFAULT 'Fredag' NOT NULL,
  	"days_friday_closed" boolean DEFAULT false,
  	"days_friday_opens_at" varchar DEFAULT '11:00',
  	"days_friday_closes_at" varchar DEFAULT '21:00',
  	"days_saturday_label" varchar DEFAULT 'Lørdag' NOT NULL,
  	"days_saturday_closed" boolean DEFAULT false,
  	"days_saturday_opens_at" varchar DEFAULT '11:00',
  	"days_saturday_closes_at" varchar DEFAULT '21:00',
  	"days_sunday_label" varchar DEFAULT 'Søndag' NOT NULL,
  	"days_sunday_closed" boolean DEFAULT false,
  	"days_sunday_opens_at" varchar DEFAULT '11:00',
  	"days_sunday_closes_at" varchar DEFAULT '21:00',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "opening_hours" CASCADE;
  CREATE TYPE "public"."enum_opening_hours_days_day" AS ENUM('1', '2', '3', '4', '5', '6', '0');
  CREATE TABLE "opening_hours" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"address" varchar NOT NULL,
  	"address_url" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  CREATE TABLE "opening_hours_days" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"day" "enum_opening_hours_days_day" NOT NULL,
  	"closed" boolean DEFAULT false,
  	"opens_at" varchar,
  	"closes_at" varchar
  );
  ALTER TABLE "opening_hours_days" ADD CONSTRAINT "opening_hours_days_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."opening_hours"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "opening_hours_days_order_idx" ON "opening_hours_days" USING btree ("_order");
  CREATE INDEX "opening_hours_days_parent_id_idx" ON "opening_hours_days" USING btree ("_parent_id");
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
  ALTER TABLE "_pages_v_blocks_reviews" ALTER COLUMN "smiley_icon" SET DATA TYPE "public"."enum__pages_v_blocks_reviews_smiley_icon" USING "smiley_icon"::"public"."enum__pages_v_blocks_reviews_smiley_icon";`)
}
