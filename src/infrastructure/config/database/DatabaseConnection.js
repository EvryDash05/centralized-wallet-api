import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

class Database {
    static instance = null;

    constructor() {
        if (!process.env.DATABASE_URL) {
            throw new Error("DATABASE_URL no definida en el entorno");
        }

        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            max: 10,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
            ssl: { rejectUnauthorized: false }
        });
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    async query(sql, params = []) {
        const client = await this.pool.connect();
        try {
            const res = await client.query(sql, params);
            return res;
        } finally {
            client.release();
        }
    }

    async close() {
        await this.pool.end();
    }
}

export default Database.getInstance();
