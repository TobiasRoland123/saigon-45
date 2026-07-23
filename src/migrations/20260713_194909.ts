import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_menu_item_grid_items" ADD COLUMN "highlighted" boolean DEFAULT false;
    ALTER TABLE "_pages_v_blocks_menu_item_grid_items" ADD COLUMN "highlighted" boolean DEFAULT false;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_menu_item_grid_items" DROP COLUMN "highlighted";
    ALTER TABLE "_pages_v_blocks_menu_item_grid_items" DROP COLUMN "highlighted";`)
}
