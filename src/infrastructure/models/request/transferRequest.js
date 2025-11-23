import z from "zod";

const ALLOWED_APP_NAMES = ["LUCA", "PLAY MONEY"];

export const sendNewTransferSchema = z.object({
    fromIdentifier: z.string()
        .min(9, "El identificador del emisor debe tener al menos 9 caracteres") // número de teléfono
        .max(15, "El identificador del emisor debe tener máximo 15 caracteres"),
    toIdentifier: z.string()
        .min(9, "El identificador del destinatario debe tener al menos 9 caracteres")
        .max(15, "El identificador del destinatario debe tener máximo 15 caracteres"),
    toAppName: z.string()
        .refine(val => ALLOWED_APP_NAMES.includes(val), {
            message: `El nombre de la aplicación debe ser uno de los siguientes: ${ALLOWED_APP_NAMES.join(", ")}`,
        }),
    amount: z.number()
        .positive("El valor debe ser mayor que 0")
        .refine(val => Number(val.toFixed(2)) === val, {
            message: "El valor debe tener como máximo 2 decimales"
        }),
    description: z.string()
        .min(5, "La descripción debe tener mínimo 5 caracteres")
        .max(100, "La descripción debe tener máximo 100 caracteres")
});
