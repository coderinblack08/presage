import { Request, Router } from "express";
import multer from "multer";
import * as mm from "music-metadata";
import { join } from "path";
import path from "path/posix";
import { getConnection } from "typeorm";
import { Like } from "../../entity/Like";
import { Presage } from "../../entity/Presage";
import { isAuth } from "../../lib/isAuth";
import { fileTypeValidation } from "./fileTypeValidation";
import { presageSchema } from "./presageSchema";

export const presageRouter = Router();
const upload = multer({
  dest: join(__dirname, "../../../uploads"),
  fileFilter: (_, file, cb) => {
    fileTypeValidation("audio", "audio", file, cb);
    fileTypeValidation("image", "thumbnail", file, cb);
  },
});

type MulterFiles = { [fieldname: string]: Express.Multer.File[] };

function getSingleFile(files: MulterFiles, field: string) {
  if (field in files) {
    return files[field][0];
  }
  return null;
}

presageRouter.post(
  "/",
  isAuth(true),
  upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  async (req: Request & { files: any }, res, next) => {
    try {
      await presageSchema.validate(req.body);
    } catch (error) {
      return next(new Error(error));
    }

    const { type, title, description, content } = req.body;
    let duration: number | null = null;

    try {
      const audioFile = getSingleFile(req.files, "audio");

      const metadata = audioFile
        ? await mm.parseFile(audioFile.path, {
            duration: true,
          })
        : null;

      duration = metadata?.format.duration
        ? Math.floor(metadata.format.duration) || null
        : null;
    } catch (error) {
      console.error(error.message);
    }

    function fileURL(field: string) {
      const file = getSingleFile(req.files, field);
      return file
        ? `http://localhost:4000/uploads/${path.basename(file.path)}`
        : null;
    }

    const data = {
      type,
      title,
      description,
      content,
      audio: fileURL("audio"),
      thumbnail: fileURL("thumbnail"),
      duration,
      userId: req.userId,
    };

    const presage = await Presage.create(data).save();
    res.json(presage);
  }
);

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
