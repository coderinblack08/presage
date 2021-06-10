import { Router } from "express";
import multer from "multer";
import { join } from "path";
import { getAudioDurationInSeconds } from "get-audio-duration";
import { isAuth } from "../../lib/isAuth";
import { prisma } from "../../lib/prisma";
import { fetchFileUrl } from "./fetchFileUrl";
import { fileTypeValidation } from "./fileTypeValidation";
import { presageSchema } from "./presageSchema";

export const presageRouter = Router();
const upload = multer({
  dest: join(__dirname, "../../../uploads"),
  limits: { fileSize: 5e6 },
  fileFilter(_, file, cb) {
    fileTypeValidation("image", "thumbnail", file, cb);
    fileTypeValidation("audio", "audio", file, cb);
  },
});

const presageUpload = upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "audio", maxCount: 1 },
]);

presageRouter.post("/", isAuth, presageUpload, async (req, res, next) => {
  try {
    await presageSchema.validate(req.body);
  } catch (error) {
    return next(new Error(error));
  }

  const { type, title, description, content, parentId } = req.body;
  const files = req.files as {
    [fieldname: string]: Express.Multer.File[];
  };

  if (type === "audio" && !("audio" in files)) {
    return next(new Error("Please provide an audio file"));
  }

  const audio = fetchFileUrl(files, "audio");
  const thumbnail = fetchFileUrl(files, "thumbnail");

  const duration =
    type === "audio"
      ? await getAudioDurationInSeconds(files["audio"][0].path)
      : null;

  const presage = await prisma.presage.create({
    data: {
      audio,
      thumbnail,
      type,
      title,
      content,
      description,
      duration,
      parent: {
        connect: { id: parentId },
      },
      user: {
        connect: { id: req.userId },
      },
    },
  });

  res.json(presage);
});

presageRouter.get("/", async (req, res) => {
  const { limit = 10 } = req.query;
  const presages = await prisma.$queryRaw`
    select p.*,
    (case when 
      exists (
        select * from "Like" l
        where l."userId" = ${req.userId} and l."presageId" = p.id
      ) 
      then true else false
    end) as liked,
    to_jsonb(u) as user
    from "Presage" p
    left join "User" u on p."userId" = u.id
    order by p."createdAt" desc
    limit ${limit};
  `;
  res.json(presages);
});

presageRouter.get("/:id", async (req, res) => {
  const presage = await prisma.presage.findFirst({
    where: { id: req.params.id },
    include: {
      user: true,
    },
  });
  const like = await prisma.like.findFirst({
    where: { userId: req.userId, presageId: req.params.id },
  });
  res.json({ ...presage, liked: like !== null });
});

presageRouter.post("/like", isAuth, async (req, res, next) => {
  const { id } = req.body;
  const like = await prisma.like.findFirst({
    where: { userId: req.userId, presageId: id },
  });
  try {
    const [, presage] = await prisma.$transaction([
      like
        ? prisma.like.delete({
            where: { presageId_userId: { presageId: id, userId: req.userId! } },
          })
        : prisma.like.create({
            data: {
              presage: { connect: { id } },
              user: { connect: { id: req.userId } },
            },
          }),
      prisma.$executeRaw`update "Presage" set likes = likes + ${
        like ? -1 : 1
      } where id = ${id} returning *;`,
    ]);
    res.json(presage);
  } catch (error) {
    next(new Error(error));
  }
});
