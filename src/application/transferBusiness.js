import { ApiError } from "../infrastructure/exceptions/ApiError.js";
import { findParticipantByAppName } from "../infrastructure/repository/participantsRepository.js";
import { findWalletByUserIdentifierAndParticipantName } from "../infrastructure/repository/walletRepository.js";

export async function sendTransfer(req) {
    const { toIdentifier, toAppName, amount, externalTransactionId } = req.body;
    let response;
    const recipientWallet = await findWalletByUserIdentifierAndParticipantName(toIdentifier, toAppName);
    const participant = await findParticipantByAppName(toAppName);

    if (!participant) {
        throw new ApiError(404, 'Participante no encontrado', [
            { atribute: 'toAppName', message: `No existe un participante con el nombre de aplicación ${toAppName}` }
        ]);
    }

    if (!recipientWallet) {
        throw new ApiError(404, 'Billetera no encontrada', [
            { atribute: 'toIdentifier', message: `En ${toAppName} no existe un usuario con el número ${toIdentifier}` }
        ]);
    }

    const { webhook_url, token, app_name } = participant;

    if (app_name === 'LUCA') {
        response = await fetchLucaWebhook(webhook_url, token, {
            walletId: recipientWallet.internal_wallet_id,
            amount,
            externalTransactionId: externalTransactionId,
            counterpartyId: recipientWallet.internal_wallet_id
        })
    } else if (app_name === 'PIXEL MONEY') {
        /* response = await fetchLucaWebhook(webhook_url, token, {
            walletId: recipientWallet.internal_wallet_id,
            amount,
            counterpartyId: recipientWallet.internal_wallet_id
        }) */
    }

    if (!response.ok) {
        throw new ApiError(response.status, 'Error al enviar la transferencia', [{ atribute: 'webhook', message: 'No se pudo enviar la transferencia al webhook proporcionado' }]);
    }

    return {
        code: 200,
        message: 'Transferencia enviada exitosamente',
    }
}

async function fetchLucaWebhook(webhookUrl, token, data) {
    const { walletId, amount, externalTransactionId, counterpartyId } = data;
    return await fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-wallet-token': token
        },
        body: JSON.stringify({
            walletId: walletId,
            amount: amount,
            externalTransactionId: externalTransactionId,
            counterpartyId: counterpartyId,
            currency: 'SOL'
        })
    });
}
