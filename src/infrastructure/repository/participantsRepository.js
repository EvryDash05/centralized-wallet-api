import DatabaseConnection from "../config/database/DatabaseConnection.js";
import { PARTICIPANTS_QUERIES } from "./queries/participantsQueries.js";

export async function validateParticipant(token) {
    const response = await DatabaseConnection.query(PARTICIPANTS_QUERIES.FIND_PARTICIPANT_BY_TOKEN, [token]);
    return response.rows[0];
}
