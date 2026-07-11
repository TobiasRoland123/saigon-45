import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_reviews_reviews" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"name" varchar,
  	"source" varchar DEFAULT 'Google Review',
  	"rating" numeric DEFAULT 5
  );

  CREATE TABLE "pages_blocks_reviews" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Kvalitet du kan smage',
  	"rating_label" varchar DEFAULT '4.5+ Stjerner på Google',
  	"rating_description" varchar DEFAULT 'Vores gæster elsker vores mad og hurtige service.',
  	"smiley_title" varchar DEFAULT 'Elite Smiley',
  	"smiley_link_label" varchar DEFAULT 'Se vores seneste Smiley-rapport her.',
  	"smiley_link_url" varchar,
  	"block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_reviews_reviews" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"name" varchar,
  	"source" varchar DEFAULT 'Google Review',
  	"rating" numeric DEFAULT 5,
  	"_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_reviews" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Kvalitet du kan smage',
  	"rating_label" varchar DEFAULT '4.5+ Stjerner på Google',
  	"rating_description" varchar DEFAULT 'Vores gæster elsker vores mad og hurtige service.',
  	"smiley_title" varchar DEFAULT 'Elite Smiley',
  	"smiley_link_label" varchar DEFAULT 'Se vores seneste Smiley-rapport her.',
  	"smiley_link_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );

  ALTER TABLE "pages_blocks_reviews_reviews" ADD CONSTRAINT "pages_blocks_reviews_reviews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_reviews" ADD CONSTRAINT "pages_blocks_reviews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_reviews_reviews" ADD CONSTRAINT "_pages_v_blocks_reviews_reviews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_reviews" ADD CONSTRAINT "_pages_v_blocks_reviews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_reviews_reviews_order_idx" ON "pages_blocks_reviews_reviews" USING btree ("_order");
  CREATE INDEX "pages_blocks_reviews_reviews_parent_id_idx" ON "pages_blocks_reviews_reviews" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_reviews_order_idx" ON "pages_blocks_reviews" USING btree ("_order");
  CREATE INDEX "pages_blocks_reviews_parent_id_idx" ON "pages_blocks_reviews" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_reviews_path_idx" ON "pages_blocks_reviews" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_reviews_reviews_order_idx" ON "_pages_v_blocks_reviews_reviews" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_reviews_reviews_parent_id_idx" ON "_pages_v_blocks_reviews_reviews" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_reviews_order_idx" ON "_pages_v_blocks_reviews" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_reviews_parent_id_idx" ON "_pages_v_blocks_reviews" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_reviews_path_idx" ON "_pages_v_blocks_reviews" USING btree ("_path");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_reviews_reviews" CASCADE;
  DROP TABLE "pages_blocks_reviews" CASCADE;
  DROP TABLE "_pages_v_blocks_reviews_reviews" CASCADE;
  DROP TABLE "_pages_v_blocks_reviews" CASCADE;`)
}
