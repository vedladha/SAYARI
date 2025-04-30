import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error('Database not setup!');
}

const pool = new Pool({ connectionString });


export default pool;