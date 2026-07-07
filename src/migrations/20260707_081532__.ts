import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_opening_hours_days_day" AS ENUM('1', '2', '3', '4', '5', '6', '0');
  CREATE TABLE "opening_hours_days" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"day" "enum_opening_hours_days_day" NOT NULL,
  	"closed" boolean DEFAULT false,
  	"opens_at" varchar,
  	"closes_at" varchar
  );

  CREATE TABLE "opening_hours" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"address" varchar NOT NULL,
  	"address_url" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  ALTER TABLE "opening_hours_days" ADD CONSTRAINT "opening_hours_days_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."opening_hours"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "opening_hours_days_order_idx" ON "opening_hours_days" USING btree ("_order");
  CREATE INDEX "opening_hours_days_parent_id_idx" ON "opening_hours_days" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "opening_hours_days" CASCADE;
  DROP TABLE "opening_hours" CASCADE;
  DROP TYPE "public"."enum_opening_hours_days_day";`)
}
