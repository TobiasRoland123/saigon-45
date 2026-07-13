import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

// Adds the unified `business_info` global (address, contact, weekly hours,
// social media) and the `find_us` block tables, and drops the old
// `opening_hours` global whose data is absorbed into business_info. Before the
// DROP we copy the single opening_hours row into business_info so production's
// hero pill keeps its address + hours (zip/phone are left blank — the admin
// enforces them on the next save). Also adds the 'externalLink' icon enum value.
//
// This migration additionally drops the orphaned `pages_hero_info_items` /
// `_pages_v_version_hero_info_items` tables: the hero `infoItems` field was
// removed from config in cd9506e ("Remove old OpenPill and related config")
// but no migration ever dropped its tables, so the generator reconciles them
// here. The generated snapshot already reflects config, so this keeps the two
// in sync — reviewed by hand per the stale-snapshot caveat.

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_business_info_social_media_platform" AS ENUM('facebook', 'instagram', 'x', 'linkedin', 'youtube', 'tiktok', 'whatsapp', 'pinterest');
  ALTER TYPE "public"."enum_pages_blocks_feature_highlights_items_icon" ADD VALUE 'externalLink' BEFORE 'mapPin';
  ALTER TYPE "public"."enum_pages_blocks_reviews_rating_icon" ADD VALUE 'externalLink' BEFORE 'mapPin';
  ALTER TYPE "public"."enum_pages_blocks_reviews_smiley_icon" ADD VALUE 'externalLink' BEFORE 'mapPin';
  ALTER TYPE "public"."enum__pages_v_blocks_feature_highlights_items_icon" ADD VALUE 'externalLink' BEFORE 'mapPin';
  ALTER TYPE "public"."enum__pages_v_blocks_reviews_rating_icon" ADD VALUE 'externalLink' BEFORE 'mapPin';
  ALTER TYPE "public"."enum__pages_v_blocks_reviews_smiley_icon" ADD VALUE 'externalLink' BEFORE 'mapPin';
  CREATE TABLE "pages_blocks_find_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Besøg os i dag',
  	"address_label" varchar DEFAULT 'Adresse',
  	"hours_label" varchar DEFAULT 'Åbningstider',
  	"contact_label" varchar DEFAULT 'Kontakt',
  	"button_label" varchar DEFAULT 'Find vej på Google Maps',
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_find_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Besøg os i dag',
  	"address_label" varchar DEFAULT 'Adresse',
  	"hours_label" varchar DEFAULT 'Åbningstider',
  	"contact_label" varchar DEFAULT 'Kontakt',
  	"button_label" varchar DEFAULT 'Find vej på Google Maps',
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "business_info_social_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_business_info_social_media_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "business_info" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"address_street" varchar NOT NULL,
  	"address_zip_city" varchar NOT NULL,
  	"address_extra_details" varchar,
  	"address_google_maps_url" varchar NOT NULL,
  	"contact_phone" varchar NOT NULL,
  	"contact_email" varchar,
  	"opening_hours_monday_label" varchar DEFAULT 'Mandag' NOT NULL,
  	"opening_hours_monday_closed" boolean DEFAULT false,
  	"opening_hours_monday_opens_at" varchar DEFAULT '11:00',
  	"opening_hours_monday_closes_at" varchar DEFAULT '21:00',
  	"opening_hours_tuesday_label" varchar DEFAULT 'Tirsdag' NOT NULL,
  	"opening_hours_tuesday_closed" boolean DEFAULT false,
  	"opening_hours_tuesday_opens_at" varchar DEFAULT '11:00',
  	"opening_hours_tuesday_closes_at" varchar DEFAULT '21:00',
  	"opening_hours_wednesday_label" varchar DEFAULT 'Onsdag' NOT NULL,
  	"opening_hours_wednesday_closed" boolean DEFAULT false,
  	"opening_hours_wednesday_opens_at" varchar DEFAULT '11:00',
  	"opening_hours_wednesday_closes_at" varchar DEFAULT '21:00',
  	"opening_hours_thursday_label" varchar DEFAULT 'Torsdag' NOT NULL,
  	"opening_hours_thursday_closed" boolean DEFAULT false,
  	"opening_hours_thursday_opens_at" varchar DEFAULT '11:00',
  	"opening_hours_thursday_closes_at" varchar DEFAULT '21:00',
  	"opening_hours_friday_label" varchar DEFAULT 'Fredag' NOT NULL,
  	"opening_hours_friday_closed" boolean DEFAULT false,
  	"opening_hours_friday_opens_at" varchar DEFAULT '11:00',
  	"opening_hours_friday_closes_at" varchar DEFAULT '21:00',
  	"opening_hours_saturday_label" varchar DEFAULT 'Lørdag' NOT NULL,
  	"opening_hours_saturday_closed" boolean DEFAULT false,
  	"opening_hours_saturday_opens_at" varchar DEFAULT '11:00',
  	"opening_hours_saturday_closes_at" varchar DEFAULT '21:00',
  	"opening_hours_sunday_label" varchar DEFAULT 'Søndag' NOT NULL,
  	"opening_hours_sunday_closed" boolean DEFAULT false,
  	"opening_hours_sunday_opens_at" varchar DEFAULT '11:00',
  	"opening_hours_sunday_closes_at" varchar DEFAULT '21:00',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  INSERT INTO "business_info" (
  	"address_street", "address_zip_city", "address_google_maps_url",
  	"contact_phone",
  	"opening_hours_monday_label", "opening_hours_monday_closed", "opening_hours_monday_opens_at", "opening_hours_monday_closes_at",
  	"opening_hours_tuesday_label", "opening_hours_tuesday_closed", "opening_hours_tuesday_opens_at", "opening_hours_tuesday_closes_at",
  	"opening_hours_wednesday_label", "opening_hours_wednesday_closed", "opening_hours_wednesday_opens_at", "opening_hours_wednesday_closes_at",
  	"opening_hours_thursday_label", "opening_hours_thursday_closed", "opening_hours_thursday_opens_at", "opening_hours_thursday_closes_at",
  	"opening_hours_friday_label", "opening_hours_friday_closed", "opening_hours_friday_opens_at", "opening_hours_friday_closes_at",
  	"opening_hours_saturday_label", "opening_hours_saturday_closed", "opening_hours_saturday_opens_at", "opening_hours_saturday_closes_at",
  	"opening_hours_sunday_label", "opening_hours_sunday_closed", "opening_hours_sunday_opens_at", "opening_hours_sunday_closes_at",
  	"updated_at", "created_at"
  )
  SELECT
  	"address", '', "address_url",
  	'',
  	"days_monday_label", "days_monday_closed", "days_monday_opens_at", "days_monday_closes_at",
  	"days_tuesday_label", "days_tuesday_closed", "days_tuesday_opens_at", "days_tuesday_closes_at",
  	"days_wednesday_label", "days_wednesday_closed", "days_wednesday_opens_at", "days_wednesday_closes_at",
  	"days_thursday_label", "days_thursday_closed", "days_thursday_opens_at", "days_thursday_closes_at",
  	"days_friday_label", "days_friday_closed", "days_friday_opens_at", "days_friday_closes_at",
  	"days_saturday_label", "days_saturday_closed", "days_saturday_opens_at", "days_saturday_closes_at",
  	"days_sunday_label", "days_sunday_closed", "days_sunday_opens_at", "days_sunday_closes_at",
  	now(), now()
  FROM "opening_hours" LIMIT 1;

  DROP TABLE "pages_hero_info_items" CASCADE;
  DROP TABLE "_pages_v_version_hero_info_items" CASCADE;
  DROP TABLE "opening_hours" CASCADE;
  ALTER TABLE "pages_blocks_find_us" ADD CONSTRAINT "pages_blocks_find_us_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_find_us" ADD CONSTRAINT "pages_blocks_find_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_find_us" ADD CONSTRAINT "_pages_v_blocks_find_us_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_find_us" ADD CONSTRAINT "_pages_v_blocks_find_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "business_info_social_media" ADD CONSTRAINT "business_info_social_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."business_info"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_find_us_order_idx" ON "pages_blocks_find_us" USING btree ("_order");
  CREATE INDEX "pages_blocks_find_us_parent_id_idx" ON "pages_blocks_find_us" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_find_us_path_idx" ON "pages_blocks_find_us" USING btree ("_path");
  CREATE INDEX "pages_blocks_find_us_media_idx" ON "pages_blocks_find_us" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_find_us_order_idx" ON "_pages_v_blocks_find_us" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_find_us_parent_id_idx" ON "_pages_v_blocks_find_us" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_find_us_path_idx" ON "_pages_v_blocks_find_us" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_find_us_media_idx" ON "_pages_v_blocks_find_us" USING btree ("media_id");
  CREATE INDEX "business_info_social_media_order_idx" ON "business_info_social_media" USING btree ("_order");
  CREATE INDEX "business_info_social_media_parent_id_idx" ON "business_info_social_media" USING btree ("_parent_id");
  DROP TYPE "public"."enum_pages_hero_info_items_icon";
  DROP TYPE "public"."enum__pages_v_version_hero_info_items_icon";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_info_items_icon" AS ENUM('arrowLeft', 'arrowRight', 'clock', 'mapPin', 'phone', 'badgeCheck', 'leaf', 'search', 'star', 'quote');
  CREATE TYPE "public"."enum__pages_v_version_hero_info_items_icon" AS ENUM('arrowLeft', 'arrowRight', 'clock', 'mapPin', 'phone', 'badgeCheck', 'leaf', 'search', 'star', 'quote');
  CREATE TABLE "pages_hero_info_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_hero_info_items_icon",
  	"label" varchar
  );
  
  CREATE TABLE "_pages_v_version_hero_info_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_version_hero_info_items_icon",
  	"label" varchar,
  	"_uuid" varchar
  );
  
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
  );
  
  DROP TABLE "pages_blocks_find_us" CASCADE;
  DROP TABLE "_pages_v_blocks_find_us" CASCADE;
  DROP TABLE "business_info_social_media" CASCADE;
  DROP TABLE "business_info" CASCADE;
  ALTER TABLE "pages_blocks_feature_highlights_items" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_feature_highlights_items_icon";
  CREATE TYPE "public"."enum_pages_blocks_feature_highlights_items_icon" AS ENUM('arrowLeft', 'arrowRight', 'clock', 'mapPin', 'phone', 'badgeCheck', 'leaf', 'search', 'star', 'quote');
  ALTER TABLE "pages_blocks_feature_highlights_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_pages_blocks_feature_highlights_items_icon" USING "icon"::"public"."enum_pages_blocks_feature_highlights_items_icon";
  ALTER TABLE "pages_blocks_reviews" ALTER COLUMN "rating_icon" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_reviews" ALTER COLUMN "rating_icon" SET DEFAULT 'star'::text;
  DROP TYPE "public"."enum_pages_blocks_reviews_rating_icon";
  CREATE TYPE "public"."enum_pages_blocks_reviews_rating_icon" AS ENUM('arrowLeft', 'arrowRight', 'clock', 'mapPin', 'phone', 'badgeCheck', 'leaf', 'search', 'star', 'quote');
  ALTER TABLE "pages_blocks_reviews" ALTER COLUMN "rating_icon" SET DEFAULT 'star'::"public"."enum_pages_blocks_reviews_rating_icon";
  ALTER TABLE "pages_blocks_reviews" ALTER COLUMN "rating_icon" SET DATA TYPE "public"."enum_pages_blocks_reviews_rating_icon" USING "rating_icon"::"public"."enum_pages_blocks_reviews_rating_icon";
  ALTER TABLE "pages_blocks_reviews" ALTER COLUMN "smiley_icon" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_reviews" ALTER COLUMN "smiley_icon" SET DEFAULT 'badgeCheck'::text;
  DROP TYPE "public"."enum_pages_blocks_reviews_smiley_icon";
  CREATE TYPE "public"."enum_pages_blocks_reviews_smiley_icon" AS ENUM('arrowLeft', 'arrowRight', 'clock', 'mapPin', 'phone', 'badgeCheck', 'leaf', 'search', 'star', 'quote');
  ALTER TABLE "pages_blocks_reviews" ALTER COLUMN "smiley_icon" SET DEFAULT 'badgeCheck'::"public"."enum_pages_blocks_reviews_smiley_icon";
  ALTER TABLE "pages_blocks_reviews" ALTER COLUMN "smiley_icon" SET DATA TYPE "public"."enum_pages_blocks_reviews_smiley_icon" USING "smiley_icon"::"public"."enum_pages_blocks_reviews_smiley_icon";
  ALTER TABLE "_pages_v_blocks_feature_highlights_items" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_feature_highlights_items_icon";
  CREATE TYPE "public"."enum__pages_v_blocks_feature_highlights_items_icon" AS ENUM('arrowLeft', 'arrowRight', 'clock', 'mapPin', 'phone', 'badgeCheck', 'leaf', 'search', 'star', 'quote');
  ALTER TABLE "_pages_v_blocks_feature_highlights_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__pages_v_blocks_feature_highlights_items_icon" USING "icon"::"public"."enum__pages_v_blocks_feature_highlights_items_icon";
  ALTER TABLE "_pages_v_blocks_reviews" ALTER COLUMN "rating_icon" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_reviews" ALTER COLUMN "rating_icon" SET DEFAULT 'star'::text;
  DROP TYPE "public"."enum__pages_v_blocks_reviews_rating_icon";
  CREATE TYPE "public"."enum__pages_v_blocks_reviews_rating_icon" AS ENUM('arrowLeft', 'arrowRight', 'clock', 'mapPin', 'phone', 'badgeCheck', 'leaf', 'search', 'star', 'quote');
  ALTER TABLE "_pages_v_blocks_reviews" ALTER COLUMN "rating_icon" SET DEFAULT 'star'::"public"."enum__pages_v_blocks_reviews_rating_icon";
  ALTER TABLE "_pages_v_blocks_reviews" ALTER COLUMN "rating_icon" SET DATA TYPE "public"."enum__pages_v_blocks_reviews_rating_icon" USING "rating_icon"::"public"."enum__pages_v_blocks_reviews_rating_icon";
  ALTER TABLE "_pages_v_blocks_reviews" ALTER COLUMN "smiley_icon" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_reviews" ALTER COLUMN "smiley_icon" SET DEFAULT 'badgeCheck'::text;
  DROP TYPE "public"."enum__pages_v_blocks_reviews_smiley_icon";
  CREATE TYPE "public"."enum__pages_v_blocks_reviews_smiley_icon" AS ENUM('arrowLeft', 'arrowRight', 'clock', 'mapPin', 'phone', 'badgeCheck', 'leaf', 'search', 'star', 'quote');
  ALTER TABLE "_pages_v_blocks_reviews" ALTER COLUMN "smiley_icon" SET DEFAULT 'badgeCheck'::"public"."enum__pages_v_blocks_reviews_smiley_icon";
  ALTER TABLE "_pages_v_blocks_reviews" ALTER COLUMN "smiley_icon" SET DATA TYPE "public"."enum__pages_v_blocks_reviews_smiley_icon" USING "smiley_icon"::"public"."enum__pages_v_blocks_reviews_smiley_icon";
  ALTER TABLE "pages_hero_info_items" ADD CONSTRAINT "pages_hero_info_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_info_items" ADD CONSTRAINT "_pages_v_version_hero_info_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_hero_info_items_order_idx" ON "pages_hero_info_items" USING btree ("_order");
  CREATE INDEX "pages_hero_info_items_parent_id_idx" ON "pages_hero_info_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_hero_info_items_order_idx" ON "_pages_v_version_hero_info_items" USING btree ("_order");
  CREATE INDEX "_pages_v_version_hero_info_items_parent_id_idx" ON "_pages_v_version_hero_info_items" USING btree ("_parent_id");
  DROP TYPE "public"."enum_business_info_social_media_platform";`)
}
