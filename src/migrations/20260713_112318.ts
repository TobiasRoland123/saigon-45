import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_hero_info_items" CASCADE;
  DROP TABLE "_pages_v_version_hero_info_items" CASCADE;
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
  
  ALTER TABLE "pages_hero_info_items" ADD CONSTRAINT "pages_hero_info_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_info_items" ADD CONSTRAINT "_pages_v_version_hero_info_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_hero_info_items_order_idx" ON "pages_hero_info_items" USING btree ("_order");
  CREATE INDEX "pages_hero_info_items_parent_id_idx" ON "pages_hero_info_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_hero_info_items_order_idx" ON "_pages_v_version_hero_info_items" USING btree ("_order");
  CREATE INDEX "_pages_v_version_hero_info_items_parent_id_idx" ON "_pages_v_version_hero_info_items" USING btree ("_parent_id");`)
}
