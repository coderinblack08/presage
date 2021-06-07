import { Router } from "express";
import multer from "multer";
import { join } from "path";
import { prisma } from "../../lib/prisma";

type fileTypes = "audio" | "image";

const fileTypeValidation = (
  type: fileTypes,
  field: string,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const types: Record<fileTypes, RegExp> = {
    image: /(gif|jpe?g|tiff?|png|webp|bmp)/,
    audio: /(wav|m4a|mp(3|4)|webm|mpeg)/,
  };

  if (file.fieldname === field) {
    if (file.mimetype.startsWith(type) && types[type].test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type for ${field} is not supported`));
    }
  }
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

presageRouter.post("/", presageUpload, async (req, res, next) => {
  const files = req.files as {
    [fieldname: string]: Express.Multer.File[];
  };
  if (files.audio.length === 0) {
    return next(new Error("Please provide an audio file"));
  }
  const audio = `http://localhost:4000/uploads/${files.audio[0].filename}`;
  const thumbnail = files.thumbnail.length
    ? `http://localhost:4000/uploads/${files.thumbnail[0].filename}`
    : null;

  const presage = await prisma.presage.create({
    data: {
      audio,
      thumbnail,
      title: req.body.title,
      description: req.body.description,
      user: {
        connect: { id: req.userId },
      },
    },
  });

  res.json(presage);
});
