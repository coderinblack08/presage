import { Router } from "express";
import createHttpError from "http-errors";
import multer from "multer";
import * as mm from "music-metadata";
import { basename, join } from "path";
import { getManager } from "typeorm";
import * as yup from "yup";
import { Echo } from "../../entities/Echo";
import { isAuth } from "../auth/isAuth";
import { fileValidator } from "./fileValidator";

const router = Router();
const upload = multer({
  dest: join(__dirname, "../../../uploads"),
  fileFilter: (_, file, cb) => {
    fileValidator("audio", "audio", file, cb);
    fileValidator("image", "thumbnail", file, cb);
  },
});

type MulterFiles = { [fn: string]: Express.Multer.File[] };

const getFiles = (files: MulterFiles): Record<string, Express.Multer.File> =>
  Object.keys(files).reduce((acc, fn) => {
    if (files[fn].length) {
      return { ...acc, [fn]: files[fn][0] };
    }
    return acc;
  }, {});

const fileURL = (file: Express.Multer.File) => {
  return file ? `http://localhost:4000/uploads/${basename(file.path)}` : null;
};

router.get("/", isAuth(), async (req, res) => {
  const echos = await Echo.find({
    relations: ["user"],
    order: { createdAt: "DESC" },
  });
  res.json(echos);
});

router.post(
  "/",
  isAuth(true),
  upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  async (req, res, next) => {
    const schema = yup.object().shape({
      title: yup.string().required(),
      description: yup.string().nullable(),
    });

    try {
      await schema.validate(req.body);
    } catch (error) {
      const code = new createHttpError.BadRequest();
      return next(createHttpError(code, error));
    }

    const { audio: audioFile, thumbnail: thumbnailFile } = getFiles(
      req.files as MulterFiles
    );

    const metadata = audioFile
      ? await mm.parseFile(audioFile.path, {
          duration: true,
        })
      : null;

    const duration = metadata?.format.duration
      ? Math.floor(metadata.format.duration) || null
      : null;

    const entityManager = getManager();
    const echo = await entityManager
      .create(Echo, {
        ...req.body,
        duration,
        audio: fileURL(audioFile),
        thumbnail: fileURL(thumbnailFile),
        userId: req.userId,
      })
      .save();

    res.json(echo);
  }
);

export default router;
