import React, { useState } from "react";
import { MdClose, MdFileUpload } from "react-icons/md";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Modal } from "../../components/Modal";

interface UploadModalProps {}

export const UploadModal: React.FC<UploadModalProps> = ({}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button color="gray" onClick={() => setOpen(true)}>
        Upload
      </Button>
      <Modal isOpen={open} closeModal={() => setOpen(false)}>
        <header className="flex items-center justify-between bg-gray-600 px-6 py-2 border-b border-gray-500">
          <button onClick={() => setOpen(false)} className="focus:outline-none">
            <MdClose className="text-gray-300 w-5 h-5" />
          </button>
          <Button icon={<MdFileUpload />} size="small">
            Upload
          </Button>
        </header>
        <div className="p-6">
          <h4>Upload Echo</h4>
          <form className="space-y-4 mt-4">
            <Input placeholder="Title" name="title" />
            <Input placeholder="Description" name="description" textarea />
            <div>
              <label className="block font-bold mb-1" htmlFor="audio">
                Audio
              </label>
              <input type="file" name="audio" id="audio" />
            </div>
            <div>
              <label className="block font-bold mb-1" htmlFor="thumbnail">
                Thumbnail
              </label>
              <input type="file" name="thumbnail" id="thumbnail" />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
