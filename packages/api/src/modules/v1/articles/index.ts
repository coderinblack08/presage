import { Router } from "express";
import { articlesMutationRouter } from "./mutations";
import { publishRouter } from "./publish";
import { articlesQueriesRouter } from "./queries";

// export const createPublishSocket = (
//   io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>
// ) => {
//   io.on("connection", (socket) => {
//     socket.on(
//       "update draft",
//       async (id: string, data: QueryDeepPartialEntity<Article>) => {
//         await Article.update(id, data);
//       }
//     );
//   });
// };

const router = Router();

router.use("/", articlesMutationRouter);
router.use("/", publishRouter);
router.use("/", articlesQueriesRouter);

export default router;
