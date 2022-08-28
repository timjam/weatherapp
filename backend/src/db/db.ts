import pgPromise from "pg-promise"
import dotenv from "dotenv"

// This should be run only once in some central place
dotenv.config()

export const pgp = pgPromise()

export const db = pgp({
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT) || 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  max: 20,
})