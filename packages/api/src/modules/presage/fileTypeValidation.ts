import multer from "multer";

type fileTypes = "audio" | "image";
export const fileTypeValidation = (
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
