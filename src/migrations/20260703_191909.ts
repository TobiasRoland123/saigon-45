import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_header_wolt_c_t_a_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_social_links_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "header_wolt_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_wolt_c_t_a_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "footer_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"about_label" varchar NOT NULL,
  	"about_saigon45" varchar NOT NULL,
  	"about_copy_right_details" varchar NOT NULL
  );
  
  CREATE TABLE "footer_contact_and_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"contact_address" varchar NOT NULL,
  	"contact_phone_number" varchar NOT NULL,
  	"contact_opening_house" jsonb
  );
  
  CREATE TABLE "footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"link_type" "enum_footer_social_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  ALTER TABLE "header" ADD COLUMN "media_id" integer;
  ALTER TABLE "footer_nav_items" ADD COLUMN "nav_label" varchar DEFAULT '' NOT NULL;
  ALTER TABLE "header_wolt_c_t_a" ADD CONSTRAINT "header_wolt_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_about" ADD CONSTRAINT "footer_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_contact_and_details" ADD CONSTRAINT "footer_contact_and_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_social_links" ADD CONSTRAINT "footer_social_links_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_social_links" ADD CONSTRAINT "footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "header_wolt_c_t_a_order_idx" ON "header_wolt_c_t_a" USING btree ("_order");
  CREATE INDEX "header_wolt_c_t_a_parent_id_idx" ON "header_wolt_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "footer_about_order_idx" ON "footer_about" USING btree ("_order");
  CREATE INDEX "footer_about_parent_id_idx" ON "footer_about" USING btree ("_parent_id");
  CREATE INDEX "footer_contact_and_details_order_idx" ON "footer_contact_and_details" USING btree ("_order");
  CREATE INDEX "footer_contact_and_details_parent_id_idx" ON "footer_contact_and_details" USING btree ("_parent_id");
  CREATE INDEX "footer_social_links_order_idx" ON "footer_social_links" USING btree ("_order");
  CREATE INDEX "footer_social_links_parent_id_idx" ON "footer_social_links" USING btree ("_parent_id");
  CREATE INDEX "footer_social_links_media_idx" ON "footer_social_links" USING btree ("media_id");
  ALTER TABLE "header" ADD CONSTRAINT "header_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "header_media_idx" ON "header" USING btree ("media_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header_wolt_c_t_a" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_about" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_contact_and_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_social_links" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "header_wolt_c_t_a" CASCADE;
  DROP TABLE "footer_about" CASCADE;
  DROP TABLE "footer_contact_and_details" CASCADE;
  DROP TABLE "footer_social_links" CASCADE;
  ALTER TABLE "header" DROP CONSTRAINT "header_media_id_media_id_fk";
  
  DROP INDEX "header_media_idx";
  ALTER TABLE "header" DROP COLUMN "media_id";
  ALTER TABLE "footer_nav_items" DROP COLUMN "nav_label";
  DROP TYPE "public"."enum_header_wolt_c_t_a_link_type";
  DROP TYPE "public"."enum_footer_social_links_link_type";`)
}
