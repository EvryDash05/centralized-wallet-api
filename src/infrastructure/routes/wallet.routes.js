import { Router } from 'express';
import { createWalletController, getWalletByIdentifierUser } from '../controllers/wallterController.js';
import { verifiedWalletToken } from '../middlewares/walletMiddlewares.js';
import { verifyToken } from '../auth/utils/jwtUtils.js';

const walletRouter = Router();

walletRouter.post('/register-wallet', [verifiedWalletToken, verifyToken], createWalletController);

walletRouter.get('/wallet/:id/:appName', [verifiedWalletToken, verifyToken], getWalletByIdentifierUser);

export default walletRouter;