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