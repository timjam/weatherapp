import { Router } from "express";
import { z } from "zod";
import { validateRequest } from "zod-express-middleware"
import { io } from "../server";

export const locationRouter = Router()

locationRouter.post("/location", validateRequest({ body: z.object({ location: z.string() }) }), async (req, res) => {
  const { location } = req.body
    // Save location to db or smth
    console.log(`Received location: ${location}`)
    io.emit("location-added", location)
    return res.send("OK")
})