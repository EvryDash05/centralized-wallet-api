import { ApiError } from "../infrastructure/exceptions/ApiError";
import { registerTransactionLog } from "../infrastructure/repository/transactionLogRepository";

export async function createTransactionLog(request) {
    const response = await registerTransactionLog(request);

    if (!response) {
        throw new ApiError(500, 'Error al registrar el log de la transacción', [
            { atribute: 'transactionLog', message: 'No se pudo registrar el log de la transacción' }
        ]);
    }
}
