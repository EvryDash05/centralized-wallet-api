import { ApiError } from "../../exceptions/ApiError.js";
import { validateParticipant } from "../../repository/participantsRepository.js";
import { sendResponse } from "../../utils/httpUtils.js";
import { validateTokenFormat, verifyToken } from "../utils/jwtUtils.js";

/* export async function validateToken(req, res, next) {

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
} */

export async function authMiddleware(req, res, next) {
    try {
        // Extraemos el token de headers o body
        const authHeader = req.headers['authorization'];
        const walletTokenHeader = req.headers['x-wallet-token'];
        const bodyToken = req.body?.token;

        const walletToken = walletTokenHeader || bodyToken;
        if (!walletToken) {
            return sendResponse(res, { code: 401, message: 'No se encontró el token de billetera' });
        }

        // Validamos que el participante exista
        const participant = await validateParticipant(walletToken);
        if (!participant) {
            return sendResponse(res, { code: 401, message: 'Token de billetera inválido' });
        }
        req.participant = participant;

        // Validamos token JWT (si existe)
        if (!authHeader) {
            return sendResponse(res, { code: 401, message: 'Token JWT no proporcionado' });
        }

        validateTokenFormat(authHeader);
        const jwtPayload = await verifyToken(authHeader.split(' ')[1], participant.token);
        req.tokenPayload = jwtPayload;

        next();
    } catch (error) {
        if (error instanceof ApiError) {
            return sendResponse(res, { code: 401, message: error.message, errors: error.errors });
        }
        console.log('Error en authMiddleware:', error);
        return sendResponse(res, { code: 500, message: 'Error inesperado al verificar el token' });
    }
}

