import { Router } from "express"
import { getAll, getNearest, insertLocationTempData } from "../db/weatherdata/weatherdb"
import { LocationQueryCodec, LocationInputCodec } from "../types/coordinate"
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
    const { format } = req.query
    const results = await getNearest(lon, lat, format).catch(e => e)
    return res.send(results)
})

weatherRouter.post("/location",
  validateRequest(LocationInputCodec),
  async (req, res, next) => {
    const results = await insertLocationTempData(req.body)
    return res.send(results)
  }
)