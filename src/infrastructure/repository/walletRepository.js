import DatabaseConnection from "../config/database/DatabaseConnection.js";
import { REGISTER_WALLET, FIND_WALLET_BY_USER_ID, FIND_WALLETE_BY_USER_IDENTIFIER_AND_PARTICIPANT_NAME } from "./queries/walletQueries.js";

export async function registerWallet(params) {
    const response = await DatabaseConnection.query(REGISTER_WALLET, [
        params.userIdentifier,
        params.internalWalletId,
        params.userName,
        params.participantId
    ]);

    return response.rows[0];
}

export async function findWalletByUserIdentifier(userIdentifier) {
    const response = await DatabaseConnection.query(FIND_WALLET_BY_USER_ID, [userIdentifier]);
    return response.rows[0];
}

export async function findWalletByUserIdentifierAndParticipantName(toIdentifier, participantName) {
    const response = await DatabaseConnection.query(FIND_WALLETE_BY_USER_IDENTIFIER_AND_PARTICIPANT_NAME, [toIdentifier, participantName]);
    return response.rows[0];
}