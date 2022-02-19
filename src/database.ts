import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, 	POSTGRES_DB_TEST
	, ENV } = process.env
const database = ENV === 'test' ? POSTGRES_DB_TEST : POSTGRES_DB
const client = new Pool({
  host: POSTGRES_HOST,
  database,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD
})


console.log(ENV)

export default client as Pool;