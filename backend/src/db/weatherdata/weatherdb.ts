import { Coordinate } from "../../types/weatherdataTypes"
import { db, pgp } from "../db"

export const getAll = async () => {
  return db.tx(async tx => tx.any(`
  SELECT
    city, ST_X(coordinates) as longitude, ST_Y(coordinates) as latitude, temperature, humidity
  FROM
    weatherdata;
  `))
}

const cToF = (format: string) => format === "C" ? `temperature` : `((((temperature)::float)*1.8)+32)::numeric AS temperature`

export const getNearest = async (lon: Coordinate, lat: Coordinate, format: string = "C" , limit: number = 1) => {
  return db.tx(async tx => tx.any(`
    SELECT
      city, ${cToF(format)}, humidity
    FROM
      weatherdata
    ORDER BY
      coordinates <-> 'SRID=4326;POINT(${lon} ${lat})'::geometry
    LIMIT ${limit}
  `))
}
const transformCoords = (column: any) => 
  column.value
    ? pgp.as.format("ST_SetSRID(ST_MakePoint(${lat}, ${lon}), 4326)", column.value)
    : "NULL"
const weatherDataSet = new pgp.helpers.ColumnSet(["city", {name: "coordinates", mod: ":raw", init: transformCoords }, "temp", "humidity"])

type LocationData = {
  city: string,
  lon: Coordinate,
  lat: Coordinate,
  temp: string,
  humidity: string
}

export const insertLocationTempData = async (data: Array<LocationData>) => {
  const tData = data.map(d => ({
    city: d.city, 
    coordinates: {
      lat: d.lat,
      lon: d.lon
    },
    temp: parseFloat(d.temp),
    humidity: parseFloat(d.humidity)
  }))
  const values = pgp.helpers.values(tData, weatherDataSet)
  return db.tx(async tx => tx.many(`
    INSERT INTO
      weatherdata (city, coordinates, temperature, humidity)
    VALUES
      ${values}
    RETURNING id;
  `))
}