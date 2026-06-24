# Getting Started - development setup

### Development

1. First [clone the repo](#clone) if you have not done so already
2. `cd my-project && cp .env.example .env` to copy the example environment variables. You'll need to add the `POSTGRES_URL` and `BLOB_READ_WRITE_TOKEN` from your Vercel project to your `.env` if you want to use Vercel Blob and the Neon database that was created for you.
- The `BLOB_READ_WRITE_TOKEN` is available on vercel under the enviroments variables for the project, but because we are not paying for vercel, then it will be shered elsewhere
- The `POSTGRES_URL` can be found in the [Neon branch dashboard](https://console.neon.tech/app/projects/fragrant-firefly-03453371/branches).
- Find the branch called `yourName development`, and click the dots to the right.
- Now copy the connectionstring, which should look something like this: `postgresql://<username>:<password>@<host>:<port>/<database>?sslmode=require`
- Paste this into the env file where it says `POSTGRES_URL=`

3. `pnpm install && pnpm dev` to install dependencies and start the dev server

- If you get an error about `pnpm` not being found, you can install it with `npm install -g pnpm`

4. open `http://localhost:3000` to open the app in your browser

That's it! Changes made in `./src` will be reflected in your app.

#### Docker (Optional - Neon is easier to get started with)

If you prefer to use Docker for local development instead of a local Postgres instance, the provided docker-compose.yml file can be used.

To do so, follow these steps:

- Modify the `POSTGRES_URL` in your `.env` file to `postgres://postgres@localhost:54320/<dbname>`
- Modify the `docker-compose.yml` file's `POSTGRES_DB` to match the above `<dbname>`
- Run `docker-compose up` to start the database, optionally pass `-d` to run in the background.

## When making changes to the database schema

When doing changes the database schema, you will need to create a migration file.

#### Migrations

[Migrations](https://payloadcms.com/docs/database/migrations) are essentially SQL code versions that keeps track of your schema. When deploy with Postgres you will need to make sure you create and then run your migrations.

Locally create a migration

```bash
pnpm payload migrate:create
```

This creates the migration files you will need to push alongside with your new configuration.
