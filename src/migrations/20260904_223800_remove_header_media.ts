// fallow-ignore-file
import { sql } from '@payloadcms/db-vercel-postgres'
import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "header" DROP CONSTRAINT IF EXISTS "header_media_id_media_id_fk";
    DROP INDEX IF EXISTS "header_media_idx";
    ALTER TABLE "header" DROP COLUMN IF EXISTS "media_id";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "media_id" integer;
    ALTER TABLE "header" ADD CONSTRAINT "header_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    CREATE INDEX IF NOT EXISTS "header_media_idx" ON "header" USING btree ("media_id");
  `)
}
