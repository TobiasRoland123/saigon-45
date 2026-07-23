import { sql } from '@payloadcms/db-vercel-postgres'
import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_menu_items_type" AS ENUM('food', 'drink', 'dessert');
    ALTER TABLE "menu_items"
      ADD COLUMN "type" "enum_menu_items_type" DEFAULT 'food' NOT NULL;
    ALTER TABLE "menu_items" ALTER COLUMN "type" DROP DEFAULT;

    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1
        FROM "pages_blocks_bubble_tea_products"
        WHERE media_id IS NULL OR name IS NULL
      ) OR EXISTS (
        SELECT 1
        FROM "_pages_v_blocks_bubble_tea_products"
        WHERE media_id IS NULL OR name IS NULL
      ) THEN
        RAISE EXCEPTION
          'Cannot migrate Bubble Tea products with a missing media or name value';
      END IF;
    END $$;

    CREATE TEMP TABLE "_bubble_tea_item_migration_map" (
      "media_id" integer NOT NULL,
      "name" varchar NOT NULL,
      "menu_item_id" integer NOT NULL,
      PRIMARY KEY ("media_id", "name")
    ) ON COMMIT DROP;

    INSERT INTO "_bubble_tea_item_migration_map" ("media_id", "name", "menu_item_id")
    SELECT
      legacy_product.media_id,
      legacy_product.name,
      MIN(menu_item.id)
    FROM (
      SELECT media_id, name
      FROM "pages_blocks_bubble_tea_products"

      UNION

      SELECT media_id, name
      FROM "_pages_v_blocks_bubble_tea_products"
    ) AS legacy_product
    INNER JOIN "menu_items" AS menu_item
      ON menu_item.media_id = legacy_product.media_id
      AND menu_item.name = legacy_product.name
    GROUP BY legacy_product.media_id, legacy_product.name;

    UPDATE "menu_items" AS menu_item
    SET "type" = 'drink'
    FROM "_bubble_tea_item_migration_map" AS migration_map
    WHERE menu_item.id = migration_map.menu_item_id;

    WITH legacy_products AS (
      SELECT
        product.media_id,
        product.name,
        block.subtitle,
        block.price_label,
        0 AS source_priority,
        block._parent_id AS page_id,
        product._order
      FROM "pages_blocks_bubble_tea_products" AS product
      INNER JOIN "pages_blocks_bubble_tea" AS block
        ON block.id = product._parent_id
      WHERE product.media_id IS NOT NULL
        AND product.name IS NOT NULL

      UNION ALL

      SELECT
        product.media_id,
        product.name,
        block.subtitle,
        block.price_label,
        1 AS source_priority,
        block._parent_id AS page_id,
        product._order
      FROM "_pages_v_blocks_bubble_tea_products" AS product
      INNER JOIN "_pages_v_blocks_bubble_tea" AS block
        ON block.id = product._parent_id
      WHERE product.media_id IS NOT NULL
        AND product.name IS NOT NULL
    ),
    distinct_products AS (
      SELECT DISTINCT ON (media_id, name)
        media_id,
        name,
        subtitle,
        price_label
      FROM legacy_products
      ORDER BY media_id, name, source_priority, page_id, _order
    ),
    missing_products AS (
      SELECT distinct_product.*
      FROM distinct_products AS distinct_product
      LEFT JOIN "_bubble_tea_item_migration_map" AS migration_map
        ON migration_map.media_id = distinct_product.media_id
        AND migration_map.name = distinct_product.name
      WHERE migration_map.menu_item_id IS NULL
    ),
    numbered_products AS (
      SELECT
        media_id,
        name,
        subtitle,
        price_label,
        COALESCE((SELECT MAX(number) FROM "menu_items"), 0)
          + ROW_NUMBER() OVER (ORDER BY name, media_id) AS number
      FROM missing_products
    ),
    inserted_items AS (
      INSERT INTO "menu_items" (
        "media_id",
        "number",
        "name",
        "type",
        "description",
        "price",
        "highlighted"
      )
      SELECT
        media_id,
        number,
        name,
        'drink',
        COALESCE(NULLIF(subtitle, ''), 'Bubble tea'),
        COALESCE(price_label, ''),
        false
      FROM numbered_products
      RETURNING id, media_id, name
    )
    INSERT INTO "_bubble_tea_item_migration_map" ("media_id", "name", "menu_item_id")
    SELECT media_id, name, id
    FROM inserted_items;

    INSERT INTO "pages_rels" ("order", "parent_id", "path", "menu_items_id")
    SELECT
      product._order,
      block._parent_id,
      CONCAT(block._path, '.', block._order - 1, '.items'),
      migration_map.menu_item_id
    FROM "pages_blocks_bubble_tea_products" AS product
    INNER JOIN "pages_blocks_bubble_tea" AS block
      ON block.id = product._parent_id
    INNER JOIN "_bubble_tea_item_migration_map" AS migration_map
      ON migration_map.media_id = product.media_id
      AND migration_map.name = product.name;

    INSERT INTO "_pages_v_rels" ("order", "parent_id", "path", "menu_items_id")
    SELECT
      product._order,
      block._parent_id,
      CONCAT(block._path, '.', block._order - 1, '.items'),
      migration_map.menu_item_id
    FROM "_pages_v_blocks_bubble_tea_products" AS product
    INNER JOIN "_pages_v_blocks_bubble_tea" AS block
      ON block.id = product._parent_id
    INNER JOIN "_bubble_tea_item_migration_map" AS migration_map
      ON migration_map.media_id = product.media_id
      AND migration_map.name = product.name;

    DROP TABLE "pages_blocks_bubble_tea_products" CASCADE;
    DROP TABLE "_pages_v_blocks_bubble_tea_products" CASCADE;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE "pages_blocks_bubble_tea_products" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "media_id" integer,
      "name" varchar
    );

    CREATE TABLE "_pages_v_blocks_bubble_tea_products" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "media_id" integer,
      "name" varchar,
      "_uuid" varchar
    );

    ALTER TABLE "pages_blocks_bubble_tea_products"
      ADD CONSTRAINT "pages_blocks_bubble_tea_products_media_id_media_id_fk"
      FOREIGN KEY ("media_id") REFERENCES "public"."media"("id")
      ON DELETE set null ON UPDATE no action;
    ALTER TABLE "pages_blocks_bubble_tea_products"
      ADD CONSTRAINT "pages_blocks_bubble_tea_products_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_bubble_tea"("id")
      ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "_pages_v_blocks_bubble_tea_products"
      ADD CONSTRAINT "_pages_v_blocks_bubble_tea_products_media_id_media_id_fk"
      FOREIGN KEY ("media_id") REFERENCES "public"."media"("id")
      ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_pages_v_blocks_bubble_tea_products"
      ADD CONSTRAINT "_pages_v_blocks_bubble_tea_products_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_bubble_tea"("id")
      ON DELETE cascade ON UPDATE no action;

    CREATE INDEX "pages_blocks_bubble_tea_products_order_idx"
      ON "pages_blocks_bubble_tea_products" USING btree ("_order");
    CREATE INDEX "pages_blocks_bubble_tea_products_parent_id_idx"
      ON "pages_blocks_bubble_tea_products" USING btree ("_parent_id");
    CREATE INDEX "pages_blocks_bubble_tea_products_media_idx"
      ON "pages_blocks_bubble_tea_products" USING btree ("media_id");
    CREATE INDEX "_pages_v_blocks_bubble_tea_products_order_idx"
      ON "_pages_v_blocks_bubble_tea_products" USING btree ("_order");
    CREATE INDEX "_pages_v_blocks_bubble_tea_products_parent_id_idx"
      ON "_pages_v_blocks_bubble_tea_products" USING btree ("_parent_id");
    CREATE INDEX "_pages_v_blocks_bubble_tea_products_media_idx"
      ON "_pages_v_blocks_bubble_tea_products" USING btree ("media_id");

    INSERT INTO "pages_blocks_bubble_tea_products" (
      "_order",
      "_parent_id",
      "id",
      "media_id",
      "name"
    )
    SELECT
      COALESCE(relation."order", 0),
      block.id,
      CONCAT('rollback-', relation.id),
      menu_item.media_id,
      menu_item.name
    FROM "pages_blocks_bubble_tea" AS block
    INNER JOIN "pages_rels" AS relation
      ON relation.parent_id = block._parent_id
      AND relation.path = CONCAT(block._path, '.', block._order - 1, '.items')
    INNER JOIN "menu_items" AS menu_item
      ON menu_item.id = relation.menu_items_id;

    INSERT INTO "_pages_v_blocks_bubble_tea_products" (
      "_order",
      "_parent_id",
      "media_id",
      "name",
      "_uuid"
    )
    SELECT
      COALESCE(relation."order", 0),
      block.id,
      menu_item.media_id,
      menu_item.name,
      CONCAT('rollback-', relation.id)
    FROM "_pages_v_blocks_bubble_tea" AS block
    INNER JOIN "_pages_v_rels" AS relation
      ON relation.parent_id = block._parent_id
      AND relation.path = CONCAT(block._path, '.', block._order - 1, '.items')
    INNER JOIN "menu_items" AS menu_item
      ON menu_item.id = relation.menu_items_id;

    DELETE FROM "pages_rels" AS relation
    USING "pages_blocks_bubble_tea" AS block
    WHERE relation.parent_id = block._parent_id
      AND relation.path = CONCAT(block._path, '.', block._order - 1, '.items');

    DELETE FROM "_pages_v_rels" AS relation
    USING "_pages_v_blocks_bubble_tea" AS block
    WHERE relation.parent_id = block._parent_id
      AND relation.path = CONCAT(block._path, '.', block._order - 1, '.items');

    ALTER TABLE "menu_items" DROP COLUMN "type";
    DROP TYPE "public"."enum_menu_items_type";
  `)
}
