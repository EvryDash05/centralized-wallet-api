import { sendResponse } from "../utils/httpUtils.js";

export const validateRequest = (schema) => (req, res, next) => {
    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
        const issues = parsed.error.issues.map(i => ({
            attribute: i.path.join('.'),
            message: i.message
        }));

        return sendResponse(res, { code: 400, message: 'Petición inválida', errors: issues });
    }

    req.body = parsed.data;
    next();
};
