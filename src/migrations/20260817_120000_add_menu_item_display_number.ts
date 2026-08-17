import { sql } from '@payloadcms/db-vercel-postgres'
import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "menu_items"
      ADD COLUMN "display_number" varchar;

    -- Eksisterende retter viser fortsat det samme nummer som før.
    UPDATE "menu_items"
    SET "display_number" = "number"::text;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "menu_items" DROP COLUMN "display_number";
  `)
}
