export const PARTICIPANTS_QUERIES = {
    FIND_PARTICIPANT_BY_TOKEN: `
        SELECT *
        FROM participants
        WHERE token = $1
    `,
    FIND_PARTICIPANT_BY_APP_NAME: `
        SELECT *
        FROM participants
        WHERE app_name = $1
    `
}
