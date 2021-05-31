import { createWriteStream } from "fs";
import { FileUpload } from "graphql-upload";
import { v4 } from "uuid";
import { __prod__ } from "../../constants";

export const uploadFile = async (file: FileUpload) => {
  const filePath = `${v4()}-${file.filename}`;
  if (!__prod__) {
    await new Promise((resolve, reject) =>
      file
        .createReadStream()
        .pipe(createWriteStream(`${__dirname}/../../../uploads/${filePath}`))
        .on("finish", () => resolve(true))
        .on("error", () => reject(false))
    );
  }
  return filePath;
};
