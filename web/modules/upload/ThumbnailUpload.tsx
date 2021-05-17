import React, { useRef } from "react";
import byteSize from "byte-size";

interface ThumbnailUploadProps {
  thumbnail: File;
  setThumbnail: React.Dispatch<React.SetStateAction<File>>;
}

export const ThumbnailUpload: React.FC<ThumbnailUploadProps> = ({
  thumbnail,
  setThumbnail,
}) => {
  const uploadRef = useRef<HTMLInputElement>();

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        name="thumbnail"
        id="thumbnail"
        className="hidden"
        ref={uploadRef}
        multiple={false}
        onChange={(e) => setThumbnail(e.target.files[0])}
      />

      <div className="flex items-center space-x-2 text-gray">
        <button
          className="button"
          type="button"
          onClick={() => uploadRef.current.click()}
        >
          <svg
            className="w-6 h-6"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.8333 5.83341V8.32508C15.8333 8.32508 14.175 8.33341 14.1667 8.32508V5.83341H11.6667C11.6667 5.83341 11.675 4.17508 11.6667 4.16675H14.1667V1.66675H15.8333V4.16675H18.3333V5.83341H15.8333ZM13.3333 9.16675V6.66675H10.8333V4.16675H4.16667C3.25 4.16675 2.5 4.91675 2.5 5.83341V15.8334C2.5 16.7501 3.25 17.5001 4.16667 17.5001H14.1667C15.0833 17.5001 15.8333 16.7501 15.8333 15.8334V9.16675H13.3333ZM4.16667 15.8334L6.66667 12.5001L8.33333 15.0001L10.8333 11.6667L14.1667 15.8334H4.16667Z"
              fill="#717A94"
            />
          </svg>
        </button>
        <label htmlFor="thumbnail">
          {thumbnail
            ? `${thumbnail.name} (${byteSize(thumbnail.size)})`
            : "Pick or drag and drop a thumbnail"}
        </label>
      </div>
    </div>
  );
};
