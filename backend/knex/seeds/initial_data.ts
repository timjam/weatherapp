import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("weatherdata").del();

    // Inserts seed entries
    // await knex("weatherdata").insert([
    //     { id: 1, colName: "rowValue1" },
    //     { id: 2, colName: "rowValue2" },
    //     { id: 3, colName: "rowValue3" }
    // ]);

    await knex.raw(`
        INSERT INTO
            weatherdata (id, city, coordinates, temperature, humidity)
        VALUES
            (1, 'Helsinki', ST_SetSRID(ST_MakePoint(24.9421,60.1676), 4326), 7.0, 40.5);
    `)
};
