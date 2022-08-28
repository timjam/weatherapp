import { Router } from "express"
import { getAll, getNearest, insertLocationTempData } from "../db/weatherdata/weatherdb"
import { LocationQueryCodec, LocationInputCodec } from "../types/weatherdataTypes"
import { validateRequest } from "zod-express-middleware"

export const weatherRouter = Router()

weatherRouter.get("/", async (req, res, next) => {
  const results = await getAll().catch(error => error)
  return res.send(results)
})

weatherRouter.get("/location",
  validateRequest(LocationQueryCodec),
  async (req, res, next) => {
    const { lon, lat } = req.body
    const { format, limit } = req.query
    const results = await getNearest(lon, lat, format, Number(limit)).catch(e => e)
    console.log(results)
    return res.send(results)
})

weatherRouter.post("/location",
  validateRequest(LocationInputCodec),
  async (req, res, next) => {
    const results = await insertLocationTempData(req.body).catch(e => e)
    return res.send(results)
  }
)