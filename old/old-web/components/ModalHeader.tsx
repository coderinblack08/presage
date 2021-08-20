import React from "react";
import { MdClose } from "react-icons/md";

interface ModalHeaderProps {
  button: React.ReactNode;
  handleClose: () => void;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  button,
  handleClose,
}) => {
  return (
    <header className="flex items-center justify-between bg-white px-6 py-2 border-b border-gray-200">
      <button
        type="button"
        onClick={handleClose}
        className="focus:outline-none focus-visible:ring rounded"
      >
        <MdClose className="text-gray-800 w-5 h-5" />
      </button>
      {button}
    </header>
  );
};
