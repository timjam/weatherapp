import { z } from "zod"

// Coordinate schema
export const Coordinate = z.string().refine(val => {
  const cArray = val.split(".")
  if (cArray.length !== 2) return false
  if (cArray[0].length !== 2) return false
  if (cArray[1].length < 4) return false
  return true
}, val => ({ message: `Coordinates must be in format 'xx.xxxx'` }))

// Coordinate type
export type Coordinate = z.infer<typeof Coordinate>

export const LocationQueryCodec = {
  query: z.object({
    format: z.union([z.literal("C"), z.literal("F")]).optional(),
  }),
  body: z.object({
    lon: Coordinate,
    lat: Coordinate
  })
}

export const LocationInputCodec = {
  body: z.array(
    z.object({
      city: z.string(),
      lat: Coordinate,
      lon: Coordinate,
      temp: z.number(),
      humidity: z.number(),
    })
  )}