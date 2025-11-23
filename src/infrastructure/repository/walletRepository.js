import DatabaseConnection from "../config/database/DatabaseConnection.js";
import { configDotenv } from 'dotenv';
import { WALLET_QUERIES } from "./queries/walletQueries.js";

configDotenv();

export async function registerWallet(params) {
    console.log('Registering wallet with params:', params);
    const response = await DatabaseConnection.query(WALLET_QUERIES.REGISTER_WALLET, [
        params.userIdentifier,
        params.internalWalletId,
        params.userName,
        params.appName === 'LUCA' ?  process.env.LUCA_PARTICIPANT_ID : process.env.PIXEL_MONEY_PARTICIPANT_ID
    ]);

    return response.rows[0];
}

export async function findWalletByUserIdentifier(userIdentifier) {
    const response = await DatabaseConnection.query(WALLET_QUERIES.FIND_WALLET_BY_USER_ID, [userIdentifier]);
    return response.rows[0];
}

export async function findWalletByUserIdentifierAndParticipantName(toIdentifier, participantName) {
    const response = await DatabaseConnection.query(WALLET_QUERIES.FIND_WALLETE_BY_USER_IDENTIFIER_AND_PARTICIPANT_NAME, [toIdentifier, participantName]);
    return response.rows[0];
}

export async function findAllWalletsByUserIdentifier(userIdentifier) {
    const response = await DatabaseConnection.query(WALLET_QUERIES.FIND_WALLETS_BY_USER_IDENTIFIER, [userIdentifier]);
    return response.rows;
}