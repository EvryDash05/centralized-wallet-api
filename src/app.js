import { configDotenv } from 'dotenv';
import express from 'express';
import transferRouter from './infrastructure/routes/transfer.routes.js';
import walletRouter from './infrastructure/routes/wallet.routes.js';
import swaggerJSDoc from 'swagger-jsdoc';
import { options } from '../lib/swaggerConfig.js';
import swaggerUi from 'swagger-ui-express';

configDotenv();
const app = express();


const swaggerSpec = swaggerJSDoc(options);

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(process.env.API_BASE_URL, transferRouter);
app.use(process.env.API_BASE_URL, walletRouter);

export default app