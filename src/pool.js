import dotenv from "dotenv";
import Pool from 'pg-pool';

// Load .env into process.env
dotenv.config();

const database = process.env.DATABASE ?? 'postgres';
const user = process.env.DATABASE_USER ?? 'postgres';
const host = process.env.DATABASE_HOST ?? 'localhost';
const password = process.env.DATABASE_PASSWORD;
if (!password) {
    console.log('Please provide the database password via the DATABASE_PASSWORD env');
    process.exit(1);
}

const pool = new Pool({
    database,
    user,
    host,
    password,
    port: parseInt(process.env.DATABASE_PORT, 10),
    idleTimeoutMillis: 1000,
    connectionTimeoutMillis: 1000
});

/**
 * @type {import('pg').Client & import('pg').PoolClient}
 */
let client;
export const getPool = async () => {
    if (client) return client;
    client = await pool.connect();
    return client;
};
