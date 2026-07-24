import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_bubble_tea_toppings_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_bubble_tea_toppings_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "pages_blocks_bubble_tea" ADD COLUMN "size_legend_medium_label" varchar DEFAULT 'Medium';
  ALTER TABLE "pages_blocks_bubble_tea" ADD COLUMN "size_legend_large_label" varchar DEFAULT 'Large';
  ALTER TABLE "pages_blocks_bubble_tea" ADD COLUMN "popular_label" varchar DEFAULT 'Populær';
  ALTER TABLE "pages_blocks_bubble_tea" ADD COLUMN "toppings_heading" varchar DEFAULT 'Ekstra Toppings';
  ALTER TABLE "pages_blocks_bubble_tea" ADD COLUMN "toppings_price_label" varchar DEFAULT '+4 kr pr. stk.';
  ALTER TABLE "_pages_v_blocks_bubble_tea" ADD COLUMN "size_legend_medium_label" varchar DEFAULT 'Medium';
  ALTER TABLE "_pages_v_blocks_bubble_tea" ADD COLUMN "size_legend_large_label" varchar DEFAULT 'Large';
  ALTER TABLE "_pages_v_blocks_bubble_tea" ADD COLUMN "popular_label" varchar DEFAULT 'Populær';
  ALTER TABLE "_pages_v_blocks_bubble_tea" ADD COLUMN "toppings_heading" varchar DEFAULT 'Ekstra Toppings';
  ALTER TABLE "_pages_v_blocks_bubble_tea" ADD COLUMN "toppings_price_label" varchar DEFAULT '+4 kr pr. stk.';
  ALTER TABLE "pages_blocks_bubble_tea_toppings_items" ADD CONSTRAINT "pages_blocks_bubble_tea_toppings_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_bubble_tea"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_bubble_tea_toppings_items" ADD CONSTRAINT "_pages_v_blocks_bubble_tea_toppings_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_bubble_tea"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_bubble_tea_toppings_items_order_idx" ON "pages_blocks_bubble_tea_toppings_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_bubble_tea_toppings_items_parent_id_idx" ON "pages_blocks_bubble_tea_toppings_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_bubble_tea_toppings_items_order_idx" ON "_pages_v_blocks_bubble_tea_toppings_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_bubble_tea_toppings_items_parent_id_idx" ON "_pages_v_blocks_bubble_tea_toppings_items" USING btree ("_parent_id");
  ALTER TABLE "pages_blocks_bubble_tea" DROP COLUMN "price_label";
  ALTER TABLE "_pages_v_blocks_bubble_tea" DROP COLUMN "price_label";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_bubble_tea_toppings_items" CASCADE;
  DROP TABLE "_pages_v_blocks_bubble_tea_toppings_items" CASCADE;
  ALTER TABLE "pages_blocks_bubble_tea" ADD COLUMN "price_label" varchar;
  ALTER TABLE "_pages_v_blocks_bubble_tea" ADD COLUMN "price_label" varchar;
  ALTER TABLE "pages_blocks_bubble_tea" DROP COLUMN "size_legend_medium_label";
  ALTER TABLE "pages_blocks_bubble_tea" DROP COLUMN "size_legend_large_label";
  ALTER TABLE "pages_blocks_bubble_tea" DROP COLUMN "popular_label";
  ALTER TABLE "pages_blocks_bubble_tea" DROP COLUMN "toppings_heading";
  ALTER TABLE "pages_blocks_bubble_tea" DROP COLUMN "toppings_price_label";
  ALTER TABLE "_pages_v_blocks_bubble_tea" DROP COLUMN "size_legend_medium_label";
  ALTER TABLE "_pages_v_blocks_bubble_tea" DROP COLUMN "size_legend_large_label";
  ALTER TABLE "_pages_v_blocks_bubble_tea" DROP COLUMN "popular_label";
  ALTER TABLE "_pages_v_blocks_bubble_tea" DROP COLUMN "toppings_heading";
  ALTER TABLE "_pages_v_blocks_bubble_tea" DROP COLUMN "toppings_price_label";`)
}
