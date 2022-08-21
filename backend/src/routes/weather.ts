import { Router } from "express"

export const weatherRouter = Router()

weatherRouter.get("/", async (req, res, next) => {
  return res.send("Cities with weather data")
})
