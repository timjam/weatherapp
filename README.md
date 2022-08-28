# Simple weather app

Create a .env file under the `/backend` directory. It must contain at least the following environment variables:

```
BACKEND_PORT=<number>
POSTGRES_USER=<string>
POSTGRES_PASSWORD=<string>
POSTGRES_HOST=<string>
POSTGRES_DB=<string>
POSTGRES_PORT=<number>
```

To get the docker compose to run correctly you need to add another `.env` file next to the `docker-compose.yml` file

```
BACKEND_PORT=
POSTGRES_PORT=
```
Make sure that the values in the project root `.env` file match the values in the `./backend/.env` file.


You can use these example .env files for testing

`./backend/.env`
```
# Server environment
BACKEND_PORT=3344

# Database connection
POSTGRES_USER=otherthanadmin
POSTGRES_PASSWORD=secretpassword
POSTGRES_HOST=weatherdb
POSTGRES_DB=weatherdatadb
POSTGRES_PORT=5432
```

`.env`
```
BACKEND_PORT=3344
POSTGRES_PORT=5432
```

After creating the .env files, to get things running at project root type

```sh
docker compose up
```

Then at the backend directory type

```sh
yarn knex:migrate
```

If you want seed some data before using the system at the backend directory type

```sh
yarn knex:seed
```


## API

Quick reference to the API

For local testing you can use the provided Postman collection [Weather app.postman_collection.js](./Weather%20App.postman_collection.json)

### GET {baseUrl}/weather

Returns all hits from the weatherdata table

### GET {baseUrl}/weather/location

Returns the data from the closest location to the given longitude and latitude.

```
query params:
   format - either C or F. Returns temperatures either in Celsius (default) or Fahrenheit
   limit - positive integer. Returns n closest hits to given longitude and latitude. Defaults to 1

body:
  {
   longitude - Location longitude in format 'xx.xxxx'
   latitude - Location latitude in format 'xx.xxxx'
  }
```

### POST {baseUrl}/weather/location

Insert new locations with temperature data. Request body needs to be an array of temperature data

```
body:
   [
     {
       "city": "City name",
       "lat": "60.1234",
       "lon": "22.1234",
       "temp": "-14.5",
       "humidity": "40.3",
     },
     ...
   ]
```