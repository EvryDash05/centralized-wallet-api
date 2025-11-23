import { ApiError } from "../infrastructure/exceptions/ApiError.js";
import { findParticipantByAppName } from "../infrastructure/repository/participantsRepository.js";
import { findWalletByUserIdentifierAndParticipantName } from "../infrastructure/repository/walletRepository.js";

export async function sendTransfer(req) {
    const { toIdentifier, toAppName } = req.body;

    const wallet = await findWalletByUserIdentifierAndParticipantName(toIdentifier, toAppName);
    const participant = await findParticipantByAppName(toAppName);

    if (!participant) {
        throw new ApiError(404, 'Participante no encontrado', [
            { atribute: 'toAppName', message: `No existe un participante con el nombre de aplicación ${toAppName}` }
        ]);
    }

    if (!wallet) {
        throw new ApiError(404, 'Billetera no encontrada', [
            { atribute: 'toIdentifier', message: `En ${toAppName} no existe un usuario con el número ${toIdentifier}` }
        ]);
    }

    const { webhook_url, token } = participant;

    const response = await fetch(webhook_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
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
