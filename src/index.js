import app from './app.js';

const PORT = process.env.PORT || 4000;
const url = process.env.ENVIROMENT === 'development' ? `http://localhost:${process.env.PORT}/api-docs` : 'https://centralized-wallet-api-production.up.railway.app/api-docs/';


console.log(`API Documentation available at: ${url}`);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} http://localhost:${PORT}/api-docs`);
});