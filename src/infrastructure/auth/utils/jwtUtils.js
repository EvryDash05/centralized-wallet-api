import { configDotenv } from 'dotenv';
import { decodeJwt, jwtVerify } from 'jose';
import { ApiError } from '../../exceptions/ApiError.js';

configDotenv();

export function decodeToken(token) {
    const { payload } = decodeJwt(token);
    return payload;
}

export async function verifyToken(token, walletToken) {
    try {
        const digitalSignature = walletToken === process.env.LUCA_TOKEN ?
            process.env.LUCA_TOKEN_SIGNATURE : 
            process.env.PLAY_MONEY_SIGNATURE;

        console.log('token:', token);
        console.log('walletToken:', walletToken);
        console.log('digitalSignature:', digitalSignature);
        const { payload } = await jwtVerify(token, new TextEncoder().encode(digitalSignature));
        return payload;
    } catch (error) {
        throw new ApiError(401, 'Token inválido', { detail: 'Token de acceso inválido' });
    }
}

export function validateTokenFormat(token) {

    if (!token || typeof token !== 'string') {
        throw new ApiError(401, 'Token required', { detail: 'Token is required in Authorization header' });
    }

    if (!token.startsWith('Bearer ')) {
        throw new ApiError(401, 'Invalid token format', { detail: 'Authorization header must start with "Bearer "' });
    }

    return { valid: true, message: 'Valid token' };
}