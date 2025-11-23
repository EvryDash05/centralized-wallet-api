import { createWallet, getAllWalletsByUserIdentifier, getWalletById } from "../../application/walletBusiness.js";
import { ApiError } from "../exceptions/ApiError.js";
import { sendResponse } from "../utils/httpUtils.js";

export async function createWalletController(req, res) {
    try {
        const response = await createWallet(req.body);
        sendResponse(res, response);
    } catch (error) {
        console.log('Error: ', error);
        sendResponse(res, { code: 500, message: 'Error inesperado al registrar la billetera' });
    }
}

export async function getWalletByIdentifierUser(req, res) {
    try {
        const { id, appName } = req.params;
        console.log('id:', id, ' appName:', appName);
        const response = await getWalletById(id, appName);
        sendResponse(res, response);
    } catch (error) {
        if (error instanceof ApiError) {
            sendResponse(res, { code: error.code, message: error.message, details: error.details });
        }
        sendResponse(res, { code: 500, message: `Error inesperado al obtener la billetera con id: ${req.params.id}` });
    }
}

export async function getAllWalletsByUserIdentifierController(req, res) {
    try {
        const { userIdentifier } = req.params;
        console.log('userIdentifier:', userIdentifier);
        const response = await getAllWalletsByUserIdentifier(userIdentifier);
        sendResponse(res, response);
    } catch (error) {
        if (error instanceof ApiError) {
            sendResponse(res, { code: error.code, message: error.message, details: error.details });
        }
        sendResponse(res, { code: 500, message: `Error inesperado al obtener las billeteras del usuario con identificador: ${req.params.userIdentifier}` });
    }
}