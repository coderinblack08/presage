import React, { useState } from "react";
import { MdChevronRight } from "react-icons/md";
import { Journal } from "../../types";

interface JournalCardProps {
  journal: Journal;
}

export const JournalCard: React.FC<JournalCardProps> = ({ journal }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border shadow-sm max-w-md">
      <button onClick={() => setOpen(!open)} className="p-4 w-full text-left">
        <div className="flex items-center justify-between">
          <div className="flex items-center min-w-0">
            <div className="p-1 rounded-lg shadow border bg-white flex items-center justify-center mr-3">
              <span className="text-2xl leading-none">{journal.emoji}</span>
            </div>
            <span className={`font-semibold transition-all`}>
              {journal.name}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <MdChevronRight
              className={`text-gray-400 w-7 h-7 transition ${
                open ? "rotate-90" : "rotate-0"
              }`}
            />
          </div>
        </div>
        <p className="text-gray-500 mt-2 text-[13px]">{journal.description}</p>
      </button>
    </div>
  );
};
