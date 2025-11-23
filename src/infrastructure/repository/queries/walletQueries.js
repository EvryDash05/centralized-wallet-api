
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

export const FIND_WALLETE_BY_USER_IDENTIFIER_AND_PARTICIPANT_NAME = `
    SELECT 
        w.wallet_uuid,
        w.user_identifier,
        w.internal_wallet_id,
        w.user_name,
        p.app_name,
        p.webhook_url,
        p.token
        FROM wallets w
        JOIN participants p ON w.participant_id = p.id
        WHERE w.user_identifier = $1
    AND p.app_name = $2;             
`