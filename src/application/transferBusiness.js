import { ApiError } from "../infrastructure/exceptions/ApiError.js";
import { sendNewTransferSchema } from "../infrastructure/models/request/transferRequest.js";
import { findWalletByUserIdentifierAndParticipantName } from "../infrastructure/repository/walletRepository.js";
import { buildErrorRequest } from "../infrastructure/utils/httpUtils.js";

export async function sendTransfer(req) {

    const parsed = sendNewTransferSchema.safeParse(req.body);

    if (!parsed.success) {
        buildErrorRequest(parsed);
    }

    const { toIdentifier, toAppName } = req.body;
    const { webhook_url, token } = req.participant;

    const wallet = await findWalletByUserIdentifierAndParticipantName(toIdentifier, toAppName);

    if (!wallet) {
        throw new ApiError(404, 'Billetera no encontrada', [
            { atribute: 'toIdentifier', message: `No se encontró una billetera para el identificador de usuario proporcionado ${toIdentifier}` }
        ]);
    }

    console.log('Sending transfer to webhook:', wallet);
    console.log('ASDKLJAKSD: ', req.participant);

    const response = await fetch(webhook_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Bearer': `Authorization ${token}`
        },
        body: JSON.stringify(req.body)
    });

    if (!response.ok) {
        throw new ApiError(response.status, 'Error al enviar la transferencia', [{ atribute: 'webhook', message: 'No se pudo enviar la transferencia al webhook proporcionado' }]);
    }

    return {
        code: 200,
        message: 'Transferencia enviada exitosamente',
    }
}
