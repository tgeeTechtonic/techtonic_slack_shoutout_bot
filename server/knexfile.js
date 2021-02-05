// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/shoutoutapp',
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds/development',
    },
  },
  production: {
    client: 'pg',
    connection: {
      database: 'shoutoutapp',
      host: process.env.DATABASE_URL,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    },
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds/development',
    },
  },
};
