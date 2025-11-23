export const TRANSACTION_LOG_QUERIES = {
    REGISTER_TRANSACTION_LOG: `
        INSERT INTO transactions_log (from_participant_id, to_participant_id, from_user_identifier, to_user_identifier, monto, status, destination_tx_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING tx_uuid, from_participant_id, to_participant_id, from_user_identifier, to_user_identifier, monto, status, created_at, destination_tx_id;
    `,
    FIND_TRANSACTION_LOG_BY_TX_UUID: `
        SELECT tx_uuid, from_participant_id, to_participant_id, from_user_identifier, to_user_identifier, monto, status, created_at, destination_tx_id
        FROM transactions_log
        WHERE tx_uuid = $1;
    `
}

