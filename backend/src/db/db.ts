import pgPromise from "pg-promise"

const pgp = pgPromise()

// Remove hardcoded stuff and parse from postgres string
export const db = pgp({
  host: "weatherdb",
  port: 5432,
  database: "weatherdatadb",
  user: "otherthanadmin",
  password: "secretpassword",
  max: 20,
})