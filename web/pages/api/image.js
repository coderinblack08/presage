import multer from "multer";
import FormData from "form-data";
import sharp from "sharp";
import { initMiddleware } from "../../lib/middleware";
import { supabase } from "../../lib/supabase";

const upload = multer({ limits: { fileSize: 1000000 } });

const multerAny = initMiddleware(upload.single("image"));

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  await multerAny(req, res);

  let {
    query: { path, bucket, w, h, quality = "75" },
  } = req;

  let blob = req.file;

  const transform = await sharp(blob.buffer)
    .resize(w ? parseInt(w) : undefined, h ? parseInt(h) : undefined, {
      fit: "cover",
    })
    .jpeg({ progressive: true, mozjpeg: true, quality: parseInt(quality) })
    .toBuffer();

  try {
    const formData = new FormData();
    formData.append("", transform, path);
    formData.append("cacheControl", 3600);

    res.json(
      await fetch(`${supabase.storage.url}/object/${bucket}/${path}`, {
        method: "POST",
        headers: supabase.storage.headers,
        body: formData,
      }).then((response) => response.json())
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
