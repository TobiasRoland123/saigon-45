import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE "menu_items_badges" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL
    );

    CREATE TABLE "menu_items" (
      "id" serial PRIMARY KEY NOT NULL,
      "media_id" integer NOT NULL,
      "name" varchar NOT NULL,
      "description" varchar NOT NULL,
      "price" varchar NOT NULL,
      "highlighted" boolean DEFAULT false,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    ALTER TABLE "pages_rels" ADD COLUMN "menu_items_id" integer;
    ALTER TABLE "_pages_v_rels" ADD COLUMN "menu_items_id" integer;
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "menu_items_id" integer;
    ALTER TABLE "menu_items_badges" ADD CONSTRAINT "menu_items_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."menu_items"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_menu_items_fk" FOREIGN KEY ("menu_items_id") REFERENCES "public"."menu_items"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_menu_items_fk" FOREIGN KEY ("menu_items_id") REFERENCES "public"."menu_items"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_menu_items_fk" FOREIGN KEY ("menu_items_id") REFERENCES "public"."menu_items"("id") ON DELETE cascade ON UPDATE no action;
    CREATE INDEX "menu_items_badges_order_idx" ON "menu_items_badges" USING btree ("_order");
    CREATE INDEX "menu_items_badges_parent_id_idx" ON "menu_items_badges" USING btree ("_parent_id");
    CREATE INDEX "menu_items_media_idx" ON "menu_items" USING btree ("media_id");
    CREATE INDEX "menu_items_updated_at_idx" ON "menu_items" USING btree ("updated_at");
    CREATE INDEX "menu_items_created_at_idx" ON "menu_items" USING btree ("created_at");
    CREATE INDEX "pages_rels_menu_items_id_idx" ON "pages_rels" USING btree ("menu_items_id");
    CREATE INDEX "_pages_v_rels_menu_items_id_idx" ON "_pages_v_rels" USING btree ("menu_items_id");
    CREATE INDEX "payload_locked_documents_rels_menu_items_id_idx" ON "payload_locked_documents_rels" USING btree ("menu_items_id");

    -- Preserve existing inline menu items and their ordering when upgrading.
    CREATE TEMP TABLE "_menu_item_migration_map" (
      "legacy_id" varchar PRIMARY KEY NOT NULL,
      "menu_item_id" integer NOT NULL
    ) ON COMMIT DROP;

    DO $$
    DECLARE
      legacy_item RECORD;
      new_menu_item_id integer;
    BEGIN
      FOR legacy_item IN
        SELECT id, media_id, name, description, price, highlighted
        FROM pages_blocks_menu_item_grid_items
        ORDER BY _parent_id, _order
      LOOP
        INSERT INTO menu_items (media_id, name, description, price, highlighted)
        VALUES (
          legacy_item.media_id,
          legacy_item.name,
          legacy_item.description,
          legacy_item.price,
          legacy_item.highlighted
        )
        RETURNING id INTO new_menu_item_id;

        INSERT INTO _menu_item_migration_map (legacy_id, menu_item_id)
        VALUES (legacy_item.id, new_menu_item_id);
      END LOOP;
    END $$;

    INSERT INTO menu_items_badges (_order, _parent_id, id, label)
    SELECT badges._order, migration_map.menu_item_id, badges.id, badges.label
    FROM pages_blocks_menu_item_grid_items_badges AS badges
    INNER JOIN _menu_item_migration_map AS migration_map
      ON migration_map.legacy_id = badges._parent_id;

    INSERT INTO pages_rels ("order", parent_id, path, menu_items_id)
    SELECT legacy_item._order, block._parent_id, CONCAT(block._path, '.', block.id, '.items'), migration_map.menu_item_id
    FROM pages_blocks_menu_item_grid_items AS legacy_item
    INNER JOIN pages_blocks_menu_item_grid AS block ON block.id = legacy_item._parent_id
    INNER JOIN _menu_item_migration_map AS migration_map ON migration_map.legacy_id = legacy_item.id;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "menu_items_badges" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "menu_items" DISABLE ROW LEVEL SECURITY;
    DROP TABLE "menu_items_badges" CASCADE;
    DROP TABLE "menu_items" CASCADE;
    ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_menu_items_fk";
    ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_menu_items_fk";
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_menu_items_fk";
    DROP INDEX "pages_rels_menu_items_id_idx";
    DROP INDEX "_pages_v_rels_menu_items_id_idx";
    DROP INDEX "payload_locked_documents_rels_menu_items_id_idx";
    ALTER TABLE "pages_rels" DROP COLUMN "menu_items_id";
    ALTER TABLE "_pages_v_rels" DROP COLUMN "menu_items_id";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "menu_items_id";
  `)
}
