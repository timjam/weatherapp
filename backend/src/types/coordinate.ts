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