require('ts-node/register');
import type { Knex } from "knex"

module.exports = <{ [key: string]: Knex.Config } >{

  development: {
    client: "postgresql",
    connection: {
      host: "localhost",
      database: "weatherdatadb",
      user: "otherthanadmin",
      password: "secretpassword"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations"
    },
    seeds: {
      directory: "./seeds"
    },
    timezone: "UTC"
  },
};
