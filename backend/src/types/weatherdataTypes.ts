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

export const NonNegativeNumber = z.number().nonnegative()
export type NonNegativeNumber = z.infer<typeof NonNegativeNumber>



const numStringFormat = (precision: NonNegativeNumber, scale: NonNegativeNumber) => {
  if (precision === 0 && scale > 0) return `0.${"x".repeat(scale)}`
  if (precision > 0 && scale === 0) return `${"x".repeat(precision)}`
  return `${"x".repeat(precision)}.${"x".repeat(scale)}`
}

export const NumberString = (
  value: string, precision: NonNegativeNumber,
  scale: NonNegativeNumber
) => z.string().refine(val => {
  if (val.startsWith(".")) return false
  const cArray = val.split(".")
  switch (cArray.length) {
    case 1:
      if (cArray[0].length > precision) return false
      return true
    case 2:
      if (cArray[0].length > precision || cArray[1].length > scale) return false
      return true
    default:
      return false
  }
}, val => ({ message: `${value} must be in format ${numStringFormat(precision, scale)}` }))

export const LocationQueryCodec = {
  query: z.object({
    format: z.union([z.literal("C"), z.literal("F")]).optional(),
    limit: NumberString('limit', 1,0).optional()
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
      temp: NumberString('temp', 4, 4),
      humidity: NumberString('humidity', 4, 4),
    })
  )}