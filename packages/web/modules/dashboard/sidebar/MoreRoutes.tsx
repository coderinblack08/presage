import React from "react";
import { ExpandMore } from "@material-ui/icons";

interface MoreRoutesProps {}

export const MoreRoutes: React.FC<MoreRoutesProps> = ({}) => {
  return (
    <button className={`block px-8 py-3 w-full`}>
      <div className={`flex items-center space-x-3.5 w-full text-gray-500`}>
        <ExpandMore fontSize="medium" />
        <span className={`font-medium text-gray-500`}>Show More</span>
      </div>
    </button>
  );
};
