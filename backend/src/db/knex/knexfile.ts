require('ts-node/register');

module.exports = {

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
    }
  },
};
