import React from "react";
import { Article } from "../../lib/types";

interface TagsProps {
  article: Article;
}

export const Tags: React.FC<TagsProps> = ({ article }) => {
  return (
    <div className="inline-block">
      {article.tags ? (
        <div className="inline-flex space-x-2">
          {article.tags.map((tag) => (
            <div key={tag.id} className="text-gray-600 truncate">
              <span className="text-gray-400">#</span>
              {tag.name}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
