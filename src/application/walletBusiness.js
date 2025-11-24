import { ApiError } from "../infrastructure/exceptions/ApiError.js";
import { findAllWalletsByUserIdentifier, findWalletByUserIdentifierAndParticipantName, registerWallet } from "../infrastructure/repository/walletRepository.js";

export async function createWallet(request) {
    const { userIdentifier, internalWalletId, userName, appName } = request;

    await registerWallet({ userIdentifier, internalWalletId, userName, appName });

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

export async function getAllWalletsByUserIdentifier(userIdentifier) {
    const response = await findAllWalletsByUserIdentifier(userIdentifier);

    if (!response) {
        throw new ApiError(404, 'No se encontraron billeteras', { message: 'El usuario no tiene billeteras registradas' });
    }

    const wallets = response.map(mapToWalletResponse);

    return {
        code: 200,
        message: 'Billeteras encontradas exitosamente',
        data: wallets
    };
}


function mapToWalletResponse(dbRecord) {
    return {
        id: dbRecord.id,
        userIdentifier: dbRecord.user_identifier,
        internalWalletId: dbRecord.internal_wallet_id,
        userName: dbRecord.user_name,
        appName: dbRecord.app_name,
    };
}
