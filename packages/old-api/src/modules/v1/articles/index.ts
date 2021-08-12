import { Router } from "express";
import { articlesMutationRouter } from "./mutations";
import { publishRouter } from "./publish";
import { articlesQueriesRouter } from "./queries";

const router = Router();

router.use("/", articlesMutationRouter);
router.use("/", publishRouter);
router.use("/", articlesQueriesRouter);

export default router;
