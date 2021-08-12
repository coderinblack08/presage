import { Router } from "express";
import multer from "multer";
import { join } from "path";

const upload = multer({
  limits: { fileSize: 1024 * 1024 * 5 },
  dest: join(__dirname, "../../../uploads"),
  fileFilter: (_, file, cb) => {
    if (file.mimetype.indexOf("image") === -1) {
      cb(new Error("Only image file is allowed to be uploaded"));
    } else {
      cb(null, true);
    }
  },
});

export const uploadImageRouter = Router();
uploadImageRouter.post("/image", upload.single("image"), (req, res, next) => {
  const url = `http://localhost:4000/v1/uploads/${req.file?.filename}`;
  res.json({ url });
});
