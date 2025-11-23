import { sendTransfer } from "../../application/transferBusiness.js";
import { ApiError } from "../exceptions/ApiError.js";
import { sendResponse } from "../utils/httpUtils.js";

export async function sendTransferController(req, res) {
    try {
        const response = await sendTransfer(req);
        sendResponse(res, response);
    } catch (error) {
        console.error('Error in sendTransferController: ', error);
        if (error instanceof ApiError) {
            return sendResponse(res, { code: error.code, message: error.message, errors: error.errors });
        }
        sendResponse(res, { code: 500, message: 'Error inesperado al registrar la billetera' });
    }
}
