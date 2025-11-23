
export async function registerTransactionLog(data) {
    const response = await DatabaseConnection.query(TRANSACTION_LOG_QUERIES.REGISTER_TRANSACTION_LOG, [
        data.from_participant_id,
        data.to_participant_id,
        data.from_user_identifier,
        data.to_user_identifier,
        data.monto,
        data.status,
        data.destination_tx_id
    ]);
    return response.rows[0];
}
