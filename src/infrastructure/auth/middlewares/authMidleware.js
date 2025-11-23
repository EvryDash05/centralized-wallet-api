import { ApiError } from "../../exceptions/ApiError.js";
import { sendResponse } from "../../utils/httpUtils.js";
import { validateTokenFormat, verifyToken } from "../utils/jwtUtils.js";

export async function validateToken(req, res, next) {

    const token = req.headers['authorization'];
    const { token: walletToken } = req.participant;

    if (!token) {
        sendResponse(res, {
            code: 400,
            message: 'Token no proporcionado',
            errors: {
                detail: 'El token es requerido en el encabezado Authorization'
            }
        });
    }

    try {
        validateTokenFormat(token);
        const response = await verifyToken(token.split(' ')[1], walletToken);

        req.tokenPayload = response;
    } catch (error) {
        if (error instanceof ApiError) return sendResponse(res, { code: 401, message: error.message, errors: error.errors });
        return (res, {
            message: 'Error inesperado al verificar el token',
            errors: {
                error: 'Error la verificar el token'
            }
        });
    }

    next();
}
