import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_feature_highlights_items_icon" ADD VALUE 'mail' BEFORE 'search';
  ALTER TYPE "public"."enum_pages_blocks_feature_highlights_items_icon" ADD VALUE 'share' BEFORE 'star';
  ALTER TYPE "public"."enum_pages_blocks_reviews_rating_icon" ADD VALUE 'mail' BEFORE 'search';
  ALTER TYPE "public"."enum_pages_blocks_reviews_rating_icon" ADD VALUE 'share' BEFORE 'star';
  ALTER TYPE "public"."enum_pages_blocks_reviews_smiley_icon" ADD VALUE 'mail' BEFORE 'search';
  ALTER TYPE "public"."enum_pages_blocks_reviews_smiley_icon" ADD VALUE 'share' BEFORE 'star';
  ALTER TYPE "public"."enum__pages_v_blocks_feature_highlights_items_icon" ADD VALUE 'mail' BEFORE 'search';
  ALTER TYPE "public"."enum__pages_v_blocks_feature_highlights_items_icon" ADD VALUE 'share' BEFORE 'star';
  ALTER TYPE "public"."enum__pages_v_blocks_reviews_rating_icon" ADD VALUE 'mail' BEFORE 'search';
  ALTER TYPE "public"."enum__pages_v_blocks_reviews_rating_icon" ADD VALUE 'share' BEFORE 'star';
  ALTER TYPE "public"."enum__pages_v_blocks_reviews_smiley_icon" ADD VALUE 'mail' BEFORE 'search';
  ALTER TYPE "public"."enum__pages_v_blocks_reviews_smiley_icon" ADD VALUE 'share' BEFORE 'star';
  CREATE TABLE "pages_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Lad os høre fra dig',
  	"description" varchar DEFAULT 'Har du spørgsmål til din reservation, vores menu eller ønsker du at høre om selskabsmuligheder? Vores team står altid klar til at hjælpe.',
  	"phone_label" varchar DEFAULT 'Ring til os',
  	"email_label" varchar DEFAULT 'Send en mail',
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Lad os høre fra dig',
  	"description" varchar DEFAULT 'Har du spørgsmål til din reservation, vores menu eller ønsker du at høre om selskabsmuligheder? Vores team står altid klar til at hjælpe.',
  	"phone_label" varchar DEFAULT 'Ring til os',
  	"email_label" varchar DEFAULT 'Send en mail',
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_contact" ADD CONSTRAINT "pages_blocks_contact_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact" ADD CONSTRAINT "pages_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact" ADD CONSTRAINT "_pages_v_blocks_contact_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact" ADD CONSTRAINT "_pages_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_contact_order_idx" ON "pages_blocks_contact" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_parent_id_idx" ON "pages_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_path_idx" ON "pages_blocks_contact" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_media_idx" ON "pages_blocks_contact" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_contact_order_idx" ON "_pages_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_parent_id_idx" ON "_pages_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_path_idx" ON "_pages_v_blocks_contact" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_media_idx" ON "_pages_v_blocks_contact" USING btree ("media_id");
   `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_contact" CASCADE;
  DROP TABLE "_pages_v_blocks_contact" CASCADE;
  ALTER TABLE "pages_blocks_feature_highlights_items" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_feature_highlights_items_icon";
  CREATE TYPE "public"."enum_pages_blocks_feature_highlights_items_icon" AS ENUM('arrowLeft', 'arrowRight', 'clock', 'externalLink', 'mapPin', 'phone', 'badgeCheck', 'leaf', 'search', 'star', 'quote');
  ALTER TABLE "pages_blocks_feature_highlights_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_pages_blocks_feature_highlights_items_icon" USING "icon"::"public"."enum_pages_blocks_feature_highlights_items_icon";
  ALTER TABLE "pages_blocks_reviews" ALTER COLUMN "rating_icon" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_reviews" ALTER COLUMN "rating_icon" SET DEFAULT 'star'::text;
  DROP TYPE "public"."enum_pages_blocks_reviews_rating_icon";
  CREATE TYPE "public"."enum_pages_blocks_reviews_rating_icon" AS ENUM('arrowLeft', 'arrowRight', 'clock', 'externalLink', 'mapPin', 'phone', 'badgeCheck', 'leaf', 'search', 'star', 'quote');
  ALTER TABLE "pages_blocks_reviews" ALTER COLUMN "rating_icon" SET DEFAULT 'star'::"public"."enum_pages_blocks_reviews_rating_icon";
  ALTER TABLE "pages_blocks_reviews" ALTER COLUMN "rating_icon" SET DATA TYPE "public"."enum_pages_blocks_reviews_rating_icon" USING "rating_icon"::"public"."enum_pages_blocks_reviews_rating_icon";
  ALTER TABLE "pages_blocks_reviews" ALTER COLUMN "smiley_icon" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_reviews" ALTER COLUMN "smiley_icon" SET DEFAULT 'badgeCheck'::text;
  DROP TYPE "public"."enum_pages_blocks_reviews_smiley_icon";
  CREATE TYPE "public"."enum_pages_blocks_reviews_smiley_icon" AS ENUM('arrowLeft', 'arrowRight', 'clock', 'externalLink', 'mapPin', 'phone', 'badgeCheck', 'leaf', 'search', 'star', 'quote');
  ALTER TABLE "pages_blocks_reviews" ALTER COLUMN "smiley_icon" SET DEFAULT 'badgeCheck'::"public"."enum_pages_blocks_reviews_smiley_icon";
  ALTER TABLE "pages_blocks_reviews" ALTER COLUMN "smiley_icon" SET DATA TYPE "public"."enum_pages_blocks_reviews_smiley_icon" USING "smiley_icon"::"public"."enum_pages_blocks_reviews_smiley_icon";
  ALTER TABLE "_pages_v_blocks_feature_highlights_items" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_feature_highlights_items_icon";
  CREATE TYPE "public"."enum__pages_v_blocks_feature_highlights_items_icon" AS ENUM('arrowLeft', 'arrowRight', 'clock', 'externalLink', 'mapPin', 'phone', 'badgeCheck', 'leaf', 'search', 'star', 'quote');
  ALTER TABLE "_pages_v_blocks_feature_highlights_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__pages_v_blocks_feature_highlights_items_icon" USING "icon"::"public"."enum__pages_v_blocks_feature_highlights_items_icon";
  ALTER TABLE "_pages_v_blocks_reviews" ALTER COLUMN "rating_icon" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_reviews" ALTER COLUMN "rating_icon" SET DEFAULT 'star'::text;
  DROP TYPE "public"."enum__pages_v_blocks_reviews_rating_icon";
  CREATE TYPE "public"."enum__pages_v_blocks_reviews_rating_icon" AS ENUM('arrowLeft', 'arrowRight', 'clock', 'externalLink', 'mapPin', 'phone', 'badgeCheck', 'leaf', 'search', 'star', 'quote');
  ALTER TABLE "_pages_v_blocks_reviews" ALTER COLUMN "rating_icon" SET DEFAULT 'star'::"public"."enum__pages_v_blocks_reviews_rating_icon";
  ALTER TABLE "_pages_v_blocks_reviews" ALTER COLUMN "rating_icon" SET DATA TYPE "public"."enum__pages_v_blocks_reviews_rating_icon" USING "rating_icon"::"public"."enum__pages_v_blocks_reviews_rating_icon";
  ALTER TABLE "_pages_v_blocks_reviews" ALTER COLUMN "smiley_icon" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_reviews" ALTER COLUMN "smiley_icon" SET DEFAULT 'badgeCheck'::text;
  DROP TYPE "public"."enum__pages_v_blocks_reviews_smiley_icon";
  CREATE TYPE "public"."enum__pages_v_blocks_reviews_smiley_icon" AS ENUM('arrowLeft', 'arrowRight', 'clock', 'externalLink', 'mapPin', 'phone', 'badgeCheck', 'leaf', 'search', 'star', 'quote');
  ALTER TABLE "_pages_v_blocks_reviews" ALTER COLUMN "smiley_icon" SET DEFAULT 'badgeCheck'::"public"."enum__pages_v_blocks_reviews_smiley_icon";
  ALTER TABLE "_pages_v_blocks_reviews" ALTER COLUMN "smiley_icon" SET DATA TYPE "public"."enum__pages_v_blocks_reviews_smiley_icon" USING "smiley_icon"::"public"."enum__pages_v_blocks_reviews_smiley_icon";`)
}
