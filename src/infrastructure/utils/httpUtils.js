import { ApiError } from "../exceptions/ApiError.js";

/**
 * Envía una respuesta HTTP estandarizada con formato JSON
 * @param {Object} res - Objeto de respuesta de Express
 * @param {number} code - Código de estado HTTP (200, 400, 404, 500, etc.)
 * @param {Object} body - Objeto que contiene el cuerpo de la respuesta
 * @param {string} body.message - Mensaje descriptivo de la respuesta
 * @param {Object} [body.data] - Datos opcionales a incluir en la respuesta
 * @param {Object} [body.errors] - Errores opcionales a incluir en la respuesta
 * @returns {Object} Respuesta JSON con formato estandarizado
 */
export function sendResponse(res, result) {
    console.log('sendResponse result:', result);
    const { code, message, data, errors } = result;
    return res.status(code).json({
        success: code >= 200 && code < 300,
        message,
        data: data ?? null,
        errors: errors ?? null,
    });
}

/**
 * buildErrorRequest: recibe el resultado de zod.safeParse y lanza ApiError
 */
/* export function buildErrorRequest(zodParseResult) {
    if (zodParseResult.success) return;
    console.log(zodParseResult.error.issues);
    const issues = zodParseResult.error.issues.map(i => ({ atribute: i.path[0], message: i.message }));
    throw new ApiError(400, 'Invalid input', issues);
} */