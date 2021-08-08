import express, { Router } from "express";
import { join } from "path";
import articlesRouter from "./articles";
import authRouter from "./auth";
import commentRouter from "./comment";
import followRouter from "./follow";
import journalRouter from "./journals";
import rewardRouter from "./reward";
import referralRouter from "./reward/referrals";
import { uploadImageRouter } from "./uploadImage";

export const v1 = Router();
v1.use("/uploads", express.static(join(__dirname, "../../../uploads")));
v1.use("/", authRouter);
v1.use("/", followRouter);
v1.use("/", uploadImageRouter);
v1.use("/articles", articlesRouter);
v1.use("/journals", journalRouter);
v1.use("/rewards", rewardRouter);
v1.use("/comments", commentRouter);
v1.use("/referrals", referralRouter);
