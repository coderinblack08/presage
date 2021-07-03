import { format } from "date-fns";
import React from "react";
import { Article } from "../../lib/types";

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <article className="space-y-2">
      <div className="flex items-center space-x-3">
        <img
          src={article.user.profilePicture}
          className="w-6 h-6 rounded-full"
          alt={article.user.displayName}
        />
        <p className="font-bold">{article.user.displayName}</p>
      </div>
      <h4 className="break-words">{article.title}</h4>
      <p className="text-gray-300">
        {format(new Date(article.createdAt), "MMMM dd")}
        {article.readingTime ? ` · ${article.readingTime} min read` : ""}
      </p>
    </article>
  );
};
