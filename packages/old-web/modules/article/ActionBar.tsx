import React from "react";
import { MdBookmarkBorder } from "react-icons/md";
import { Button } from "../../components/Button";
import { Article } from "../../lib/types";
import { LikeButton } from "./LikeButton";
import { ReferButton } from "./ReferButton";

interface ActionBarProps {
  article: Article;
}

export const ActionBar: React.FC<ActionBarProps> = ({ article }) => {
  return (
    <div className="flex items-center space-x-8 mt-6 md:mt-8">
      <LikeButton article={article} />
      <ReferButton article={article} />
      <Button
        color="transparent"
        size="none"
        icon={
          <MdBookmarkBorder className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
        }
        noAnimate
      >
        <span className="text-gray-600">0</span>
      </Button>
    </div>
  );
};
