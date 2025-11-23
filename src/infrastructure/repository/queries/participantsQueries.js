export const PARTICIPANTS_QUERIES = {
    FIND_PARTICIPANT_BY_TOKEN: `
        SELECT *
        FROM participants
        WHERE token = $1
    `
}
