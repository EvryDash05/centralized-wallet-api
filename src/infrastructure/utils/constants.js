import dotenv from 'dotenv';
dotenv.config();

export const ALLOWED_APP_NAMES = ["LUCA", "PIXEL MONEY"];
export const API_DOCS_URL = process.env.ENVIRONMENT === 'development' ? `http://localhost:${process.env.PORT}/api-docs` : 'https://centralized-wallet-api-production.up.railway.app/api-docs/';