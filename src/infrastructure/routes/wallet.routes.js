import { Router } from 'express';
import { createWallet, getWalletById } from '../../application/walletBusiness.js';
import { sendResponse } from '../utils/httpUtils.js';

const walletRouter = Router();

walletRouter.get('/wallets', (req, res) => {
    res.json({ message: 'List of wallets' });
});

walletRouter.post('/register-wallet', async (req, res) => {
    try {
        const response = await createWallet(req.body);
        sendResponse(res, response);
    } catch (error) {
        console.log('Error: ', error);
        sendResponse(res, { code: 500, message: 'Error inesperado al registrar la billetera' });
    }
});

walletRouter.get('/wallet/:id', async (req, res) => {
    try {
        const response = await getWalletById(req.params.id);
        sendResponse(res, response);
    } catch (error) {
        if (error instanceof ApiError) {
            sendResponse(res, { code: error.code, message: error.message, details: error.details });
        }
        sendResponse(res, { code: 500, message: `Error inesperado al obtener la billetera con id: ${req.params.id}` });
    }
});

export default walletRouter;