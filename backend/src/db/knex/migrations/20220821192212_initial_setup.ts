import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.raw(
    `
    CREATE EXTENSION IF NOT EXISTS plpgsql;
    CREATE EXTENSION IF NOT EXISTS postgis;
    `
  ).then(() => {
    return knex.schema.createTable("weatherdata", (table) => {
      table.increments("id").primary()
      table.string("city", 255).notNullable()
      table.specificType("coordinates", "geometry(point, 4326)")
      table.float("temperature")
      table.float("humidity")
    })
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("weatherdata")
}

