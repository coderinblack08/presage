import { FolderAddIcon, XIcon } from "@heroicons/react/solid";
import React from "react";
import Dropzone from "react-dropzone";
import { Button } from "../../components/Button";
import byteSize from "byte-size";

interface ThumbnailUploadProps {
  thumbnail: File;
  setThumbnail: React.Dispatch<React.SetStateAction<File>>;
}

export const ThumbnailUpload: React.FC<ThumbnailUploadProps> = ({
  thumbnail,
  setThumbnail,
}) => {
  return (
    <Dropzone
      onDrop={async ([file]) => setThumbnail(file)}
      multiple={false}
      accept="image/*"
    >
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div className="flex flex-col items-center mt-3 py-8 px-12 w-full rounded-lg border border-darker-gray bg-darkest-gray">
              <FolderAddIcon className="mb-2 w-12 h-12 text-primary" />
              {thumbnail && (
                <p className="text-light-gray">
                  {thumbnail.name}{" "}
                  <span className="text-lighter-gray">
                    ({byteSize(thumbnail.size).toString()})
                  </span>
                </p>
              )}
              <p className={`text-gray ${thumbnail ? "small" : ""}`}>
                Pick or drag and drop a {thumbnail ? "new " : ""}
                thumbnail — 1MB Max
              </p>
            </div>
          </div>
          {thumbnail && (
            <Button
              type="button"
              color="secondary"
              size="small"
              className="mt-5"
              icon={<XIcon className="w-4 h-4" />}
              onClick={() => setThumbnail(null)}
            >
              Clear Thumbnail
            </Button>
          )}
        </section>
      )}
    </Dropzone>
  );
};
