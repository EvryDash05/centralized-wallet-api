import app from './app.js';
import { API_DOCS_URL } from './infrastructure/utils/constants.js';

const PORT = process.env.PORT || 4000;

console.log(`API Documentation available at: ${API_DOCS_URL}`);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}: ${API_DOCS_URL}`);
});