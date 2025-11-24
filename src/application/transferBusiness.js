import { ApiError } from "../infrastructure/exceptions/ApiError.js";
import { findParticipantByAppName } from "../infrastructure/repository/participantsRepository.js";
import { findWalletByUserIdentifierAndParticipantName } from "../infrastructure/repository/walletRepository.js";

export async function sendTransfer(req) {
    const { toIdentifier, toAppName, amount, externalTransactionId, fromIdentifier } = req.body;
    let response;
    const recipientWallet = await findWalletByUserIdentifierAndParticipantName(toIdentifier, toAppName);
    const participant = await findParticipantByAppName(toAppName);
    const issuingWallet = await findWalletByUserIdentifierAndParticipantName(fromIdentifier, toAppName === 'LUCA' ? 'PIXEL MONEY' : 'LUCA');

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
        console.log('Enviando a Luca')
        response = await fetchLucaWebhook(webhook_url, token, {
            walletId: recipientWallet.internal_wallet_id, // El id de la billetera del destinatario
            amount,
            externalTransactionId: externalTransactionId,
            counterpartyId: `PIXEL-MONEY_${recipientWallet.user_name}` // El id de la billetera emisor
        })
    } else if (app_name === 'PIXEL MONEY') {
        console.log('Enviando a Pixel Money')
        response = await fetchPixelMoneyWebhook(webhook_url, token, {
            internalWalletId: recipientWallet.internal_wallet_id,
            amount,
            transactionId: externalTransactionId,
            userName: issuingWallet ? issuingWallet.user_name : 'Unknown'
        })
    }

    if (!response.ok) {
        throw new ApiError(response.status, 'Error al enviar la transferencia', [{ atribute: 'webhook', message: 'No se pudo enviar la transferencia al webhook proporcionado' }]);
    }

    return {
        code: 200,
        message: 'Transferencia enviada exitosamente',
        data: {
            userName: recipientWallet.user_name,
            toAppName,
            phone: recipientWallet.user_identifier,
        }
    }
}

async function fetchLucaWebhook(webhookUrl, token, data) {
    const { walletId, amount, externalTransactionId, counterpartyId } = data;
    console.log('fetchLucaWebhook data: ', data);
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

async function fetchPixelMoneyWebhook(webhookUrl, token, data) {
    const { internalWalletId, amount, transactionId, userName } = data;
    console.log('fetchPixelMoneyWebhook data: ', data);
    return await fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'x-wallet-token': token,
        },
        body: JSON.stringify({
            internalWalletId: internalWalletId,
            monto: amount,
            centralTransactionId: transactionId,
            fromAppName: 'LUCA',
            fromUserName: userName,
            description: 'Descripción de la transferencia',
        })
    });
}
