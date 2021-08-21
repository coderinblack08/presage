import { IconChevronDown } from "@tabler/icons";
import React from "react";

interface ShowMoreRoutesProps {}

export const ShowMoreRoutes: React.FC<ShowMoreRoutesProps> = ({}) => {
  return (
    <button className="block px-4 py-2 w-full">
      <div className="flex items-center space-x-3 w-full text-gray-600">
        <IconChevronDown stroke={1.5} />
        <span>Show More</span>
      </div>
    </button>
  );
};
