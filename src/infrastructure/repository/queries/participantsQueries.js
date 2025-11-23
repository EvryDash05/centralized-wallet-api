
export const FIND_PARTICIPANT_BY_TOKEN = `
    SELECT *
    FROM participants
    WHERE token = $1
`;