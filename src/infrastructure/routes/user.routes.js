import { Router } from "express";

const userRouter = Router();

userRouter.get("/users", (req, res) => {
    res.json({ message: "List of users" });
});

export default userRouter;