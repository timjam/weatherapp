# Simple weather app

At project root type

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