import pg from "pg"
import Knex from "knex"
import { config } from "./knex/knexfile"

const knex = Knex(config.development)