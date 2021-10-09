import React from "react";
import { Article } from "../../types";
import { HiTag, HiUserCircle } from "react-icons/hi";

interface DraftTableProps {
  draft: Article | undefined;
}

export const DraftTable: React.FC<DraftTableProps> = ({ draft }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div>
          <HiUserCircle className="text-gray-400 w-6 h-6" />
        </div>
        <div className="text-gray-500 font-semibold">Published by Kevin Lu</div>
      </div>
      <div className="flex items-center space-x-4">
        <div>
          <HiTag className="text-gray-400 w-6 h-6" />
        </div>
        <div className="flex items-center space-x-2">
          {!draft?.tags || draft?.tags?.length === 0 ? (
            <span className="text-gray-400 font-semibold">No Tags Found</span>
          ) : (
            draft?.tags?.map((tag) => (
              <div
                key={tag}
                className="px-4 py-1 rounded-lg bg-gray-100 text-gray-500 font-semibold text-sm"
              >
                <span className="text-gray-400">#</span>
                {tag}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
