import { sql } from '@payloadcms/db-vercel-postgres'
import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_menu_items_subtype" AS ENUM('bubble-tea');
    ALTER TABLE "menu_items"
      ADD COLUMN "subtype" "enum_menu_items_subtype";

    UPDATE "menu_items" AS menu_item
    SET "subtype" = 'bubble-tea'
    WHERE menu_item.type = 'drink'
      AND (
        EXISTS (
          SELECT 1
          FROM "pages_rels" AS relation
          INNER JOIN "pages_blocks_bubble_tea" AS block
            ON block._parent_id = relation.parent_id
            AND relation.path = CONCAT(block._path, '.', block._order - 1, '.items')
          WHERE relation.menu_items_id = menu_item.id
        )
        OR EXISTS (
          SELECT 1
          FROM "_pages_v_rels" AS relation
          INNER JOIN "_pages_v_blocks_bubble_tea" AS block
            ON block._parent_id = relation.parent_id
            AND relation.path = CONCAT(block._path, '.', block._order - 1, '.items')
          WHERE relation.menu_items_id = menu_item.id
        )
      );
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "menu_items" DROP COLUMN "subtype";
    DROP TYPE "public"."enum_menu_items_subtype";
  `)
}
