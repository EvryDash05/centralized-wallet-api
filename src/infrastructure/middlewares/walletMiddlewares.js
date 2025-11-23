import { validateParticipant } from "../repository/participantsRepository.js";
import { sendResponse } from "../utils/httpUtils.js";

export async function verifiedWalletToken(req, res, next) {
    try {
        console.log('Verifying wallet token middleware');
        const walletToken = req.headers['x-wallet-token'];

        if (!walletToken) {
            return sendResponse(res, { code: 401, message: 'No se encontró el token' });
        }

        const response = await validateParticipant(walletToken);

        if (!response) {
            return sendResponse(res, { code: 401, message: 'Token de billetera invalido' });
        }

        console.log('Participant validated:', response);
        req.participant = response;
        next();
    } catch (error) {
        console.log('Error in verifiedWalletToken middleware:', error);
        return sendResponse(res, { code: 500, message: 'Internal server error' });
    }
}
