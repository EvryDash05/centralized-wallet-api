import { Router } from "express";
import { authMiddleware } from "../auth/middlewares/authMidleware.js";
import { sendTransferController } from "../controllers/transferController.js";

const transferRouter = Router();
/**
 * @openapi
 * /sendTransfer:
 *   post:
 *     tags:
 *       - Transfer
 *     summary: Inicia una transferencia desde la wallet del usuario hacia otro participante
 *     security:
 *       - WalletToken: []
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransferRequest'
 *           examples:
 *             sendTransferExample:
 *               summary: Ejemplo de body para sendTransfer
 *               value:
 *                 fromIdentifier: "999344881"
 *                 toIdentifier: "999344889"
 *                 toAppName: "PLAY MONEY"
 *                 amount: 150.75
 *                 description: "Pago por servicios de consultoría"
 *     responses:
 *       '200':
 *         description: Transferencia procesada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
transferRouter.post("/sendTransfer", authMiddleware, sendTransferController);

export default transferRouter;