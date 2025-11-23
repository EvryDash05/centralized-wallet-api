import { Router } from "express";
import { validateToken } from "../auth/middlewares/authMidleware.js";
import { sendTransferController } from "../controllers/transferController.js";
import { verifiedWalletToken } from "../middlewares/walletMiddlewares.js";

const transferRouter = Router();

transferRouter.post("/sendTransfer", [verifiedWalletToken, validateToken], sendTransferController);

export default transferRouter;