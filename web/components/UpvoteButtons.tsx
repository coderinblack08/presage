import React from "react";
import { MdArrowUpward, MdArrowDownward } from "react-icons/md";

interface UpvoteButtonsProps {}

export const UpvoteButtons: React.FC<UpvoteButtonsProps> = ({}) => {
  return (
    <div className="flex flex-col items-center space-y-1 mr-6">
      <button
        className={`p-1 focus:outline-none hover:text-primary hover:bg-primary hover:bg-opacity-10 rounded-md ${
          status === "upvoted"
            ? "text-primary bg-primary bg-opacity-10"
            : "text-light-gray"
        }`}
      >
        <MdArrowUpward className="w-4 h-4" />
      </button>
      <p
        className={`small font-bold ${
          status !== "unvoted" ? "text-primary" : ""
        }`}
      >
        0
      </p>
      <button
        className={`p-1 focus:outline-none hover:text-primary hover:bg-primary hover:bg-opacity-10 rounded-md ${
          status === "downvoted"
            ? "text-primary bg-primary bg-opacity-10"
            : "text-light-gray"
        }`}
      >
        <MdArrowDownward className="w-4 h-4" />
      </button>
    </div>
  );
};
