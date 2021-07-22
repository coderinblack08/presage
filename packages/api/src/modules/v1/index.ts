import { Router } from "express";
import articlesRouter from "./articles";
import authRouter from "./auth";
import journalRouter from "./journals";
import commentRouter from "./comment";
import rewardRouter from "./reward";
import referralRouter from "./reward/referrals";
import followRouter from "./follow";

export const v1 = Router();
v1.use("/", authRouter);
v1.use("/", followRouter);
v1.use("/articles", articlesRouter);
v1.use("/journals", journalRouter);
v1.use("/rewards", rewardRouter);
v1.use("/comments", commentRouter);
v1.use("/referrals", referralRouter);
