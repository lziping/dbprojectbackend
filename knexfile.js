// Update with your config settings.
const DB = 'DBprojectDB'
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg', // ElephantSQL uses PostgreSQL
    connection: {
      host: 'br8f1xgt40ahpjhgkhjd-postgresql.services.clever-cloud.com', // Your server host
      user: 'uq9lw9huhqff4sjuzeh1', // Your database user
      password: 'TlJh1t0fjhxaxz7tjeZhtALRL7GNZV', // Your password
      database: 'br8f1xgt40ahpjhgkhjd', // Your default database
      port: 50013, // PostgreSQL's default port
    }
  }

  // development: {
  //   client: 'pg',
  //   connection: {
  //     host: 'localhost',
  //     database: DB,
  //   }
  // },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user: 'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user: 'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

};
