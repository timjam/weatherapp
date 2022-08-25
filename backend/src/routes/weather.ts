import { Router } from "express"
import { getAll, getNearest } from "../db/weatherdata/weatherdb"
import { validate } from "../validate"
import { z } from "zod"
import { Coordinate } from "../types/coordinate"

export const weatherRouter = Router()

weatherRouter.get("/", async (req, res, next) => {
  const results = await getAll().catch(error => error)
  return res.send(results)
})

weatherRouter.get("/location",
  validate(z.object({
    body: z.object({
      lon: Coordinate,
      lat: Coordinate,
    })
  })),
  async (req, res, next) => {
    const results = await getNearest(req.body.lon, req.body.lat).catch(e => e)
    return res.send(results)
})