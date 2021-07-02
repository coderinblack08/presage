import React, { useState } from "react";
import { Search as SearchIcon } from "react-iconly";
import { Input } from "../../components/Input";
import { Modal } from "../../components/Modal";

interface SearchProps {}

export const SearchBar: React.FC<SearchProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="flex items-center">
        <div className="mr-2 scale-80">
          <SearchIcon set="bulk" />
        </div>
        Browse
      </button>
      <Modal
        centered={false}
        isOpen={isOpen}
        className="mt-32"
        closeModal={() => setIsOpen(false)}
      >
        <div className="relative flex items-center">
          <div className="absolute left-0 pl-5 text-gray-300">
            <SearchIcon set="light" stroke="bold" size="small" />
          </div>
          <Input placeholder="Search Presage" className="py-3 pl-14 pr-5" />
        </div>
      </Modal>
    </>
  );
};
