import { API_DOCS_URL } from "../src/infrastructure/utils/constants.js";

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'centralized-api-docs',
        version: '1.0.0',
        description: 'Documentación de API centralizada utilizando Swagger',
    },
    servers: [
        {
            url: API_DOCS_URL,
        },
    ],
};

export const options = {
    swaggerDefinition,
    apis: ['./src/infrastructure/routes/*.js'],
};