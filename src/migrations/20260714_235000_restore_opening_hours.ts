import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "opening_hours" (
      "id" serial PRIMARY KEY NOT NULL,
      "address" varchar NOT NULL,
      "address_url" varchar NOT NULL,
      "days_monday_label" varchar DEFAULT 'Mandag' NOT NULL,
      "days_monday_closed" boolean DEFAULT false,
      "days_monday_opens_at" varchar DEFAULT '11:00',
      "days_monday_closes_at" varchar DEFAULT '21:00',
      "days_tuesday_label" varchar DEFAULT 'Tirsdag' NOT NULL,
      "days_tuesday_closed" boolean DEFAULT false,
      "days_tuesday_opens_at" varchar DEFAULT '11:00',
      "days_tuesday_closes_at" varchar DEFAULT '21:00',
      "days_wednesday_label" varchar DEFAULT 'Onsdag' NOT NULL,
      "days_wednesday_closed" boolean DEFAULT false,
      "days_wednesday_opens_at" varchar DEFAULT '11:00',
      "days_wednesday_closes_at" varchar DEFAULT '21:00',
      "days_thursday_label" varchar DEFAULT 'Torsdag' NOT NULL,
      "days_thursday_closed" boolean DEFAULT false,
      "days_thursday_opens_at" varchar DEFAULT '11:00',
      "days_thursday_closes_at" varchar DEFAULT '21:00',
      "days_friday_label" varchar DEFAULT 'Fredag' NOT NULL,
      "days_friday_closed" boolean DEFAULT false,
      "days_friday_opens_at" varchar DEFAULT '11:00',
      "days_friday_closes_at" varchar DEFAULT '21:00',
      "days_saturday_label" varchar DEFAULT 'Lørdag' NOT NULL,
      "days_saturday_closed" boolean DEFAULT false,
      "days_saturday_opens_at" varchar DEFAULT '11:00',
      "days_saturday_closes_at" varchar DEFAULT '21:00',
      "days_sunday_label" varchar DEFAULT 'Søndag' NOT NULL,
      "days_sunday_closed" boolean DEFAULT false,
      "days_sunday_opens_at" varchar DEFAULT '11:00',
      "days_sunday_closes_at" varchar DEFAULT '21:00',
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "opening_hours" CASCADE;`)
}
