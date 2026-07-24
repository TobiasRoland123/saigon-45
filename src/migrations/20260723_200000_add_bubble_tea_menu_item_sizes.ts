import { sql } from '@payloadcms/db-vercel-postgres'
import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "menu_items" ADD COLUMN "medium_price" numeric;
    ALTER TABLE "menu_items" ADD COLUMN "large_price" numeric;
    ALTER TABLE "menu_items" ADD COLUMN "is_popular" boolean DEFAULT false;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "menu_items" DROP COLUMN "medium_price";
    ALTER TABLE "menu_items" DROP COLUMN "large_price";
    ALTER TABLE "menu_items" DROP COLUMN "is_popular";
  `)
}
