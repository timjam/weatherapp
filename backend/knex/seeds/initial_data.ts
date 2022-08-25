import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("weatherdata").del();

    await knex.raw(`
        INSERT INTO
            weatherdata (id, city, coordinates, temperature, humidity)
        VALUES
            (1, 'Helsinki', ST_SetSRID(ST_MakePoint(24.9421,60.1676), 4326), 7.0, 40.5),
            (2, 'Stockholm', ST_SetSRID(ST_MakePoint(18.0686,59.3293), 4326), -7.0, 37.1);
    `)
};
