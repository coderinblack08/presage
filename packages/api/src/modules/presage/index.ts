import { Request, Router } from "express";
import { getAudioDurationInSeconds } from "get-audio-duration";
import multer from "multer";
import { join } from "path";
import { getConnection } from "typeorm";
import { Like } from "../../entity/Like";
import { Presage } from "../../entity/Presage";
import { isAuth } from "../../lib/isAuth";
import { fetchFileUrl } from "./fetchFileUrl";
import { fileTypeValidation } from "./fileTypeValidation";
import { presageSchema } from "./presageSchema";

export type MulterFiles = {
  [fieldname: string]: Express.Multer.File[];
};

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

presageRouter.post("/", isAuth(true), presageUpload, async (req, res, next) => {
  try {
    await presageSchema.validate(req.body);
  } catch (error) {
    return next(new Error(error));
  }

  const { type, title, description, content } = req.body;
  const files = req.files as MulterFiles;

  if (type === "audio" && !files?.hasOwnProperty("audio")) {
    return next(new Error("Please provide an audio file"));
  }

  const audio = fetchFileUrl(files, "audio");
  const thumbnail = fetchFileUrl(files, "thumbnail");

  const duration =
    type === "audio"
      ? Math.floor(await getAudioDurationInSeconds(files["audio"][0].path))
      : null;

  const data = {
    type,
    title,
    description,
    content,
    audio,
    thumbnail,
    duration,
    userId: req.userId,
  };

  const presage = await Presage.create(data).save();
  res.json(presage);
});

presageRouter.get("/", isAuth(), async (req: Request, res) => {
  const { limit = 10 } = req.query;
  const presages = await getConnection().query(
    `
    select p.*,
    ${
      req.userId
        ? `(case when 
        exists (
          select * from public.like l
          where l."userId" = $1 and l."presageId" = p.id
        ) 
        then true else false
       end) as liked,`
        : ""
    }
    json_build_object(
      'id', u.id,
      'username', u.username,
      'displayName', u."displayName",
      'profilePicture', u."profilePicture",
      'updatedAt', u."updatedAt",
      'createdAt', u."createdAt"
    ) as user
    from presage p
    left join public.user u on p."userId" = u.id
    order by p."createdAt" desc
    limit $2;
  `,
    [req.userId, limit]
  );
  res.json(presages);
});

presageRouter.get("/:id", isAuth(), async (req: Request, res) => {
  const presage = await Presage.findOne(req.params.id, { relations: ["user"] });
  const like = await Like.findOne({
    where: { userId: req.userId, presageId: req.params.id },
  });

  res.json({ ...presage, liked: like !== undefined });
});

presageRouter.post("/like", isAuth(true), async (req, res, next) => {
  const { id } = req.body;
  const data = { presageId: id, userId: req.userId };
  const like = await Like.findOne({ where: data });
  try {
    await getConnection().transaction(async (tm) => {
      if (like) {
        await tm.delete(Like, data);
      } else {
        await tm.create(Like, data).save();
      }
      const presage = await tm.query(
        `
          update presage
          set points = points + $1
          where id = $2
          returning *;
        `,
        [like ? -1 : 1, id]
      );
      res.json(presage);
    });
  } catch (error) {
    next(new Error(error));
  }
});
