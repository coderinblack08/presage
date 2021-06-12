import { Request, Router } from "express";
import multer from "multer";
import * as mm from "music-metadata";
import { join } from "path";
import path from "path/posix";
import { getConnection } from "typeorm";
import { v4 } from "uuid";
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
  if (files && field in files) {
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

    const { type, title, description, content, parentId } = req.body;
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

    const parent = parentId ? await Presage.findOne(parentId) : null;
    const id = v4();
    const data = {
      id,
      type,
      title,
      description,
      content,
      audio: fileURL("audio"),
      thumbnail: fileURL("thumbnail"),
      duration,
      userId: req.userId,
      path: parent ? [...parent.path, id] : [id],
    };
    const presage = await Presage.create(data).save();
    res.json(presage);
  }
);

presageRouter.get("/", isAuth(), async (req: Request, res) => {
  const { limit = 10 } = req.query;
  const params = [limit];
  if (req.userId) params.push(req.userId);

  const presages = await getConnection().query(
    `
    select p.*,
    ${
      req.userId
        ? `(case when 
        exists (
          select * from public.like l
          where l."userId" = $2 and l."presageId" = p.id
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
    where array_length(p.path, 1) = 1
    order by p."createdAt" desc
    limit $1;
  `,
    params
  );
  res.json(presages);
});

presageRouter.get("/:id", isAuth(), async (req: Request, res) => {
  const params = [req.params.id];
  if (req.userId) params.push(req.userId);

  let data = await getConnection().query(
    `
    select 
    p.*,
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
    where path && array[$1];
  `,
    params
  );

  const tree: any = { ...data[0], children: [] };
  data = data.sort((a: any, b: any) => a.path.length - b.path.length);
  for (const node of data.slice(1)) {
    const depth = node.path.length - 2;
    let treeNode: any = tree;
    for (let k = 0; k < depth; k++) {
      treeNode = treeNode.children.find((x: any) => x.id === node.path[k + 1]);
    }
    treeNode.children.push({ ...node, children: [] });
  }

  res.json({ tree });
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
