import { z } from "zod";
import { ALLOWED_APP_NAMES } from "../../utils/constants.js";

export const registerWalletSchema = z.object({
    userIdentifier: z.string()
        .min(1, "El identificador de usuario no puede estar vacío")
        .max(50, "El identificador de usuario debe tener como máximo 50 caracteres")
        .regex(/^[0-9]+$/, "El identificador de usuario solo puede contener números"),

    internalWalletId: z.number()
        .int("El ID interno de la billetera debe ser un número entero")
        .nonnegative("El ID interno no puede ser negativo"),
    
    userName: z.string()
        .min(3, "El nombre del usuario debe tener mínimo 3 caracteres")
        .max(100, "El nombre del usuario debe tener máximo 100 caracteres"),
    
    appName: z.string()
        .min(1, "El nombre de la app no puede estar vacío")
        .max(50, "El nombre de la app debe tener como máximo 50 caracteres")
        .refine(value => ALLOWED_APP_NAMES.includes(value), {
            message: `El nombre de la app debe ser uno de los siguientes: ${ALLOWED_APP_NAMES.join(", ")}`
        })
});
