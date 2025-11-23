import express from 'express';
import userRouter from './infrastructure/routes/user.routes.js';
import { configDotenv } from 'dotenv';
import walletRouter from './infrastructure/routes/wallet.routes.js';
import Database from './infrastructure/config/database/DatabaseConnection.js';

configDotenv();
const app = express();

app.use(express.json());

app.use(process.env.API_BASE_URL, userRouter);
app.use(process.env.API_BASE_URL, walletRouter);

app.get('/', async (req, res) => {
    const response = await Database.getInstance().query('SELECT * FROM playing_with_neon;');
    res.json({data: response});
})

export default app