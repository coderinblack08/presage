import { Router, Request } from "express";
import createHttpError from "http-errors";
import { Article } from "../../entities/Article";
import { isAuth } from "../auth/isAuth";

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
router.post("/", isAuth(true), async (req, res) => {
  const article = await Article.create({
    title: "",
    userId: req.userId,
  }).save();
  res.json(article);
});

router.patch(
  "/:id",
  isAuth(true),
  async (req: Request<{ id: string }>, res) => {
    const article = await Article.update(req.params.id, req.body);
    res.json(article.raw);
  }
);

router.get("/drafts", isAuth(true), async (req, res) => {
  const articles = await Article.find({
    where: { userId: req.userId },
    order: { updatedAt: "DESC" },
    select: ["id", "title", "published", "createdAt", "updatedAt"],
  });
  res.json(articles);
});

router.get("/:id", async (req, res, next) => {
  try {
    const article = await Article.findOne({ where: { id: req.params.id } });
    res.json(article);
  } catch (error) {
    next(createHttpError(401, error));
  }
});

export default router;
