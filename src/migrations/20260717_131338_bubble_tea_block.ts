import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE "pages_blocks_bubble_tea_products" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "media_id" integer,
      "name" varchar
    );
    CREATE TABLE "pages_blocks_bubble_tea" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "heading" varchar DEFAULT 'Bubble tea',
      "subtitle" varchar,
      "price_label" varchar,
      "block_name" varchar
    );
    CREATE TABLE "_pages_v_blocks_bubble_tea_products" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "media_id" integer,
      "name" varchar,
      "_uuid" varchar
    );
    CREATE TABLE "_pages_v_blocks_bubble_tea" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "heading" varchar DEFAULT 'Bubble tea',
      "subtitle" varchar,
      "price_label" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );
    ALTER TABLE "pages_blocks_bubble_tea_products" ADD CONSTRAINT "pages_blocks_bubble_tea_products_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "pages_blocks_bubble_tea_products" ADD CONSTRAINT "pages_blocks_bubble_tea_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_bubble_tea"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "pages_blocks_bubble_tea" ADD CONSTRAINT "pages_blocks_bubble_tea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "_pages_v_blocks_bubble_tea_products" ADD CONSTRAINT "_pages_v_blocks_bubble_tea_products_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_pages_v_blocks_bubble_tea_products" ADD CONSTRAINT "_pages_v_blocks_bubble_tea_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_bubble_tea"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "_pages_v_blocks_bubble_tea" ADD CONSTRAINT "_pages_v_blocks_bubble_tea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    CREATE INDEX "pages_blocks_bubble_tea_products_order_idx" ON "pages_blocks_bubble_tea_products" USING btree ("_order");
    CREATE INDEX "pages_blocks_bubble_tea_products_parent_id_idx" ON "pages_blocks_bubble_tea_products" USING btree ("_parent_id");
    CREATE INDEX "pages_blocks_bubble_tea_products_media_idx" ON "pages_blocks_bubble_tea_products" USING btree ("media_id");
    CREATE INDEX "pages_blocks_bubble_tea_order_idx" ON "pages_blocks_bubble_tea" USING btree ("_order");
    CREATE INDEX "pages_blocks_bubble_tea_parent_id_idx" ON "pages_blocks_bubble_tea" USING btree ("_parent_id");
    CREATE INDEX "pages_blocks_bubble_tea_path_idx" ON "pages_blocks_bubble_tea" USING btree ("_path");
    CREATE INDEX "_pages_v_blocks_bubble_tea_products_order_idx" ON "_pages_v_blocks_bubble_tea_products" USING btree ("_order");
    CREATE INDEX "_pages_v_blocks_bubble_tea_products_parent_id_idx" ON "_pages_v_blocks_bubble_tea_products" USING btree ("_parent_id");
    CREATE INDEX "_pages_v_blocks_bubble_tea_products_media_idx" ON "_pages_v_blocks_bubble_tea_products" USING btree ("media_id");
    CREATE INDEX "_pages_v_blocks_bubble_tea_order_idx" ON "_pages_v_blocks_bubble_tea" USING btree ("_order");
    CREATE INDEX "_pages_v_blocks_bubble_tea_parent_id_idx" ON "_pages_v_blocks_bubble_tea" USING btree ("_parent_id");
    CREATE INDEX "_pages_v_blocks_bubble_tea_path_idx" ON "_pages_v_blocks_bubble_tea" USING btree ("_path");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE "pages_blocks_bubble_tea_products" CASCADE;
    DROP TABLE "pages_blocks_bubble_tea" CASCADE;
    DROP TABLE "_pages_v_blocks_bubble_tea_products" CASCADE;
    DROP TABLE "_pages_v_blocks_bubble_tea" CASCADE;
  `)
}
