import DatabaseConnection from "../config/database/DatabaseConnection.js";
import { FIND_PARTICIPANT_BY_TOKEN } from "./queries/participantsQueries.js";

export async function validateParticipant(token) {
    const response = await DatabaseConnection.query(FIND_PARTICIPANT_BY_TOKEN, [token]);
    return response.rows[0];
}
