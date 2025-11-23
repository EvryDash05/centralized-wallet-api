/**
 * ApiError: error con código HTTP y payload adicional
 */
export class ApiError extends Error {
    constructor(code = 500, message = 'Internal Server Error', errors = {}) {
        super(message);
        this.code = code;
        this.errors = errors;
    }
}