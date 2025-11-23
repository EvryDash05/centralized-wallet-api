
export const FIND_WALLET_BY_USER_ID = `
            SELECT wallet_uuid, user_identifier, internal_wallet_id, user_name, participant_id, created_at
            FROM wallets
            WHERE user_identifier = $1;
`

export const REGISTER_WALLET = `
            INSERT INTO wallets (user_identifier, internal_wallet_id, user_name, participant_id)
            VALUES ($1, $2, $3, $4)
            RETURNING wallet_uuid, user_identifier, user_name, created_at;
`