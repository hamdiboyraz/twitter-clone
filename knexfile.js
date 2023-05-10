// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const sharedConfig = {
  useNullAsDefault: true,
  migrations: {
    directory: "./data/migrations",
  },
  seeds: {
    directory: "./data/seeds",
  },
  pool: {
    afterCreate: (conn, done) => {
      conn.run("PRAGMA foreign_keys = ON", done);
    },
  },
};

module.exports = {
  development: {
    ...sharedConfig,
    client: "sqlite3",
    connection: {
      filename: "./data/twitter.db3",
    },
  },

  testing: {
    ...sharedConfig,
    client: "sqlite3",
    connection: {
      filename: "./data/test.db3",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
