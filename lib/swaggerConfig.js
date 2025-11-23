const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'centralized-api-docs',
        version: '1.0.0',
        description: 'Documentación de API centralizada utilizando Swagger',
    },
    servers: [
        {
            url: 'http://localhost:3000/api/v1',
        },
    ],
};

export const options = {
    swaggerDefinition,
    apis: ['./src/infrastructure/routes/*.js'],
};