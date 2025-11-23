import { ApiError } from "../infrastructure/exceptions/ApiError.js";
import { findWalletByUserIdentifier, findWalletByUserIdentifierAndParticipantName, registerWallet } from "../infrastructure/repository/walletRepository.js";

export async function createWallet(request) {
    const { userIdentifier, internalWalletId, userName, participantId } = request;

    await registerWallet({ userIdentifier, internalWalletId, userName, participantId });

    return {
        code: 201,
        message: 'Wallet created successfully'
    };
}

export async function getWalletById(walletId, appName) {

    if (isNaN(walletId)) {
        throw new ApiError(400, 'Invalid wallet ID');
    }

    const response = await findWalletByUserIdentifierAndParticipantName(walletId, appName);

    if (!response) {
        throw new ApiError(404, 'La billetera no existe', { message: 'El wallet con el id especificado no existe' });
    }

    const wallet = mapToWalletResponse(response);

    return {
        code: 200,
        message: 'Wallet encontrada exitosamente',
        data: wallet
    }
}

function mapToWalletResponse(dbRecord) {
    return {
        id: dbRecord.id,
        userIdentifier: dbRecord.user_identifier,
        internalWalletId: dbRecord.internal_wallet_id,
        userName: dbRecord.user_name,
        participantId: dbRecord.participant_id === 'db41c15f-e4df-4647-87c9-eb55d6578774' ? 'LUCA' : 'PLAY MONEY',
    };
}