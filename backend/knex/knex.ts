/**
 * Knex instance to be used elsewhere in the project
 * For some reason Knex is really picky about ES6/ES2015 module syntax
 * and thus require/module.export is used.
 * 
 * For now Knex is used for migrations and seeding db, so this file is
 * actually very useless at the moment
 */
import Knex from "knex"
import type { Knex as KType } from "knex"
const environment = process.env.NODE_ENV || "development"
const config: KType.Config = require("./knexfile.ts")[environment]
module.exports = Knex(config)