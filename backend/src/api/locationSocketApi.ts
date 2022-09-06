import { Router } from "express";
import { z } from "zod";
import { validateRequest } from "zod-express-middleware"
import { io } from "../server";

const locationRouter = Router()

locationRouter.post("/location", validateRequest({ body: z.object({ location: z.string() }) }), async (req, res) => {
  const { location } = req.body
    // Save location to db
    io.emit("location-added", location)
})