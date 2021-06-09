import { Router } from "express";
import multer from "multer";
import { join } from "path";
import * as yup from "yup";
import { isAuth } from "../../lib/isAuth";
import { prisma } from "../../lib/prisma";
import { fileTypeValidation } from "./fileTypeValidation";

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
  console.log(req.body);

  const nullType = yup.string().nullable().oneOf([null, undefined]);
  const presageSchema = yup.object().shape({
    type: yup.string().oneOf(["audio", "text"]).required(),
    title: yup.string().when("type", {
      is: "audio",
      then: yup.string().max(100).required(),
      otherwise: nullType,
    }),
    description: yup.string().when("type", {
      is: "audio",
      then: yup.string().max(500).nullable(),
      otherwise: nullType,
    }),
    content: yup.string().when("type", {
      is: "text",
      then: yup.string().max(500).required(),
      otherwise: nullType,
    }),
  });

  try {
    await presageSchema.validate(req.body);
  } catch (error) {
    return next(new Error(error));
  }

  const { type, title, description, content } = req.body;
  const files = req.files as {
    [fieldname: string]: Express.Multer.File[];
  };
  if (type === "audio" && !("audio" in files)) {
    return next(new Error("Please provide an audio file"));
  }

  const audio = files?.audio?.length
    ? `http://localhost:4000/uploads/${files.audio[0].filename}`
    : null;
  const thumbnail = files?.thumbnail?.length
    ? `http://localhost:4000/uploads/${files.thumbnail[0].filename}`
    : null;

  const presage = await prisma.presage.create({
    data: {
      audio,
      thumbnail,
      type,
      title,
      content,
      description,
      user: {
        connect: { id: req.userId },
      },
    },
  });

  res.json(presage);
});

presageRouter.get("/", async (req, res) => {
  const { limit = 10 } = req.query;
  const presages = await prisma.presage.findMany({
    take: parseInt(limit?.toString()),
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  res.json(presages);
});

presageRouter.get("/:id", async (req, res) => {
  const presage = await prisma.presage.findFirst({
    where: { id: req.params.id },
    include: {
      user: true,
    },
  });
  res.json(presage);
});
