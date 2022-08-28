import { Router } from "express"
import { getAll, getNearest, insertLocationTempData } from "../db/weatherdata/weatherdb"
import { LocationQueryCodec, LocationInputCodec } from "../types/weatherdataTypes"
import { validateRequest } from "zod-express-middleware"

export const weatherRouter = Router()

/**
 * GET {baseUrl}/weather
 * 
 * Returns all hits from the weatherdata table
 */
weatherRouter.get("/", async (req, res, next) => {
  const results = await getAll().catch(error => error)
  return res.send(results)
})

/**
 * GET {baseUrl}/weather/location
 * 
 * Returns the data from the closest location to the given
 * longitude and latitude.
 * 
 * query params:
 *    format - either C or F. Returns temperatures either in Celsius (default) or Fahrenheit
 *    limit - positive integer. Returns n closest hits to given longitude and latitude. Defaults to 1
 * 
 * body:
 *    longitude - Location longitude in format 'xx.xxxx'
 *    latitude - Location latitude in format 'xx.xxxx'
 * 
 */
weatherRouter.get("/location",
  validateRequest(LocationQueryCodec),
  async (req, res, next) => {
    const { lon, lat } = req.body
    const { format, limit } = req.query
    const results = await getNearest(lon, lat, format, Number(limit)).catch(e => e)
    console.log(results)
    return res.send(results)
})

/**
 * POST {baseUrl}/weather/location
 * 
 * Insert new locations with temperature data. Request body needs to
 * be an array of temperature data
 * 
 * body:
 *    [
 *      {
 *        "city": "City name",
 *        "lat": "xx.xxxx",
 *        "lon": "xx.xxxx",
 *        "temp": "xxxx.xxxx",
 *        "humidity": "xxxx.xxxx",
 *      },
 *      ...
 *    ]
 * 
 */
weatherRouter.post("/location",
  validateRequest(LocationInputCodec),
  async (req, res, next) => {
    const results = await insertLocationTempData(req.body).catch(e => e)
    return res.send(results)
  }
)