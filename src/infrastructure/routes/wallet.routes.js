import { Router } from 'express';
import { authMiddleware } from '../auth/middlewares/authMidleware.js';
import { createWalletController, getAllWalletsByUserIdentifierController, getWalletByIdentifierUser } from '../controllers/walletController.js';
import { validateRequest } from '../middlewares/requestMiddleware.js';
import { registerWalletSchema } from '../models/request/registerNewWalletRequest.js';

const walletRouter = Router();
/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *     WalletToken:
 *       type: apiKey
 *       in: header
 *       name: x-wallet-token
 *   schemas:
 *     ApiResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         data:
 *           nullable: true
 *           oneOf:
 *             - type: object
 *             - type: array
 *         errors:
 *           nullable: true
 *           type: object
 *     Wallet:
 *       type: object
 *       properties:
 *         userIdentifier:
 *           type: string
 *         internalWalletId:
 *           type: string
 *         userName:
 *           type: string
 *         appName:
 *           type: string
 *           description: Nombre de la aplicación/participante (p.ej. LUCA, PLAY MONEY)
 *     TransferRequest:
 *       type: object
 *       properties:
 *         fromIdentifier:
 *           type: string
 *           description: Emisor desde LUCA (user identifier)
 *         toIdentifier:
 *           type: string
 *           description: Destinatario en Play Money (user identifier)
 *         toAppName:
 *           type: string
 *           description: Nombre de la aplicación destino (p.ej. "PLAY MONEY")
 *         amount:
 *           type: number
 *           format: float
 *         description:
 *           type: string
 *           description: Descripción de la transferencia
 *     TransferResponse:
 *       type: object
 *       properties:
 *         transactionId:
 *           type: string
 *         amount:
 *           type: number
 *         currency:
 *           type: string
 *         from:
 *           type: string
 *         to:
 *           type: string
 *
 */

/**
 * @openapi
 * /register-wallet:
 *   post:
 *     tags:
 *       - Wallet
 *     summary: Registra/crea una wallet en el sistema
 *     security:
 *       - WalletToken: []
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userIdentifier:
 *                 type: string
 *               internalWalletId:
 *                 type: integer
 *                 description: Identificador interno de la wallet en la base de datos
 *               userName:
 *                 type: string
 *               appName:
 *                 type: string
 *             examples:
 *               registerWalletExample:
 *                 summary: Ejemplo de body para registrar wallet
 *                 value:
 *                   userIdentifier: "999344882"
 *                   internalWalletId: 3
 *                   userName: "Juan Pérez"
 *                   appName: "LUCA"
 *     responses:
 *       '200':
 *         description: Wallet creada/registrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
walletRouter.post(
    '/register-wallet', 
    [authMiddleware, validateRequest(registerWalletSchema)], 
    createWalletController
);

/**
 * @openapi
 * /wallet/{id}/{appName}:
 *   get:
 *     tags:
 *       - Wallet
 *     summary: Obtiene la wallet por identificador de usuario y aplicación
 *     security:
 *       - WalletToken: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador del usuario (userIdentifier)
 *       - in: path
 *         name: appName
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre de la aplicación/servicio
 *     responses:
 *       '200':
 *         description: Wallet encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
walletRouter.get('/wallet/:id/:appName', authMiddleware, getWalletByIdentifierUser);

/**
 * @openapi
 * /wallets/{userIdentifier}:
 *   get:
 *     tags:
 *       - Wallet
 *     summary: Obtiene las wallets por identificador de usuario
 *     security:
 *       - WalletToken: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userIdentifier
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador del usuario (userIdentifier)
 *     responses:
 *       '200':
 *         description: Wallet encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
walletRouter.get('/wallets/:userIdentifier', authMiddleware, getAllWalletsByUserIdentifierController);

export default walletRouter;