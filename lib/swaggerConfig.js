import { configDotenv } from "dotenv";
configDotenv();

const url = process.env.ENVIROMENT === 'development' ? `http://localhost:${process.env.PORT}/api/v1` : 'https://centralized-wallet-api-production.up.railway.app/api-docs/';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'centralized-api-docs',
        version: '1.0.0',
        description: 'Documentación de API centralizada utilizando Swagger',
    },
    servers: [
        {
            url,
        },
    ],
};

export const options = {
    swaggerDefinition,
    apis: ['./src/infrastructure/routes/*.js'],
};