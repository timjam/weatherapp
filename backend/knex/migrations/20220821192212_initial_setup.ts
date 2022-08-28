import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.raw(
    `
    CREATE EXTENSION IF NOT EXISTS plpgsql;
    CREATE EXTENSION IF NOT EXISTS postgis;
    `
  ).then(() => {
    return knex.raw(`
      CREATE TABLE IF NOT EXISTS weatherdata (
        id          uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
        city        VARCHAR(255) NOT NULL,
        coordinates geometry(POINT, 4326),
        temperature NUMERIC,
        humidity    NUMERIC
      );
    `)
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("weatherdata")
}

