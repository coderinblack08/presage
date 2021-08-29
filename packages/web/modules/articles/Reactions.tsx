import React from "react";
import { MdBookmarkBorder, MdFavoriteBorder, MdShare } from "react-icons/md";
import { Button } from "../../components/button";

interface ReactionsProps {}

export const Reactions: React.FC<ReactionsProps> = ({}) => {
  return (
    <div className="flex items-center space-x-8">
      <Button
        icon={<MdFavoriteBorder className="w-6 h-6" />}
        className="text-gray-500"
        color="transparent"
        size="none"
      >
        <span className="font-medium">94</span>
      </Button>
      <Button
        icon={<MdBookmarkBorder className="w-6 h-6" />}
        className="text-gray-500"
        color="transparent"
        size="none"
      >
        <span className="font-medium">12</span>
      </Button>
      <Button
        icon={<MdShare className="w-6 h-6" />}
        className="text-gray-500"
        color="transparent"
        size="none"
      >
        <span className="font-medium">89</span>
      </Button>
    </div>
  );
};
