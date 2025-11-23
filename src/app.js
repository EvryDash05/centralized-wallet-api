import { configDotenv } from 'dotenv';
import express from 'express';
import transferRouter from './infrastructure/routes/transfer.routes.js';
import walletRouter from './infrastructure/routes/wallet.routes.js';

configDotenv();
const app = express();

app.use(express.json());

app.use(process.env.API_BASE_URL, transferRouter);
app.use(process.env.API_BASE_URL, walletRouter);

export default app