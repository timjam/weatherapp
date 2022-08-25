import { Coordinate } from "../../types/coordinate"
import { db } from "../db"

export const getAll = async () => {
  return db.tx(async tx => tx.any(`
  SELECT
    city, ST_X(coordinates) as longitude, ST_Y(coordinates) as latitude, temperature, humidity
  FROM
    weatherdata;
  `))
}

export const getNearest = async (lon: Coordinate, lat: Coordinate, limit: number = 1) => {
  return db.tx(async tx => tx.any(`
    SELECT
      city, temperature, humidity
    FROM
      weatherdata
    ORDER BY
      coordinates <-> 'SRID=4326;POINT(${lon} ${lat})'::geometry
    LIMIT ${limit}
  `))
}