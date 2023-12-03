import knex from 'knex';

export const createConnection = () => {
 const database = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password: 'admin',
    database: 'postgres',
  },
 });
 return database;
}