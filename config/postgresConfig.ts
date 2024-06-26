import { config } from 'dotenv'
import knex from 'knex'

config()
const knexInstance = knex({
  client: 'postgresql',
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  },
  debug: true
})

export { knexInstance }
