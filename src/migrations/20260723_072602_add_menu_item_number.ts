import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "menu_items" ADD COLUMN "number" numeric;

    WITH numbered_items AS (
      SELECT
        id,
        row_number() OVER (ORDER BY created_at ASC, id ASC)::numeric AS number
      FROM "menu_items"
    )
    UPDATE "menu_items" AS item
    SET "number" = numbered_items.number
    FROM numbered_items
    WHERE item.id = numbered_items.id;

    ALTER TABLE "menu_items" ALTER COLUMN "number" SET NOT NULL;

    CREATE UNIQUE INDEX "menu_items_number_idx"
    ON "menu_items" USING btree ("number");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "menu_items_number_idx";
  ALTER TABLE "menu_items" DROP COLUMN "number";`)
}
