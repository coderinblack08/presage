import { format } from "date-fns";
import Link from "next/link";
import React from "react";
import { Article } from "../../lib/types";

interface ArticleCardProps {
  article: Article;
  ranking?: number;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  ranking,
}) => {
  return (
    <Link href="/article/[id]" as={`/article/${article.id}`}>
      <a className="block">
        <div className="flex items-center space-x-3 mb-3">
          <img
            src={article.user.profilePicture}
            className="w-6 h-6 rounded-full"
            alt={article.user.displayName}
          />
          <p className="font-bold">{article.user.displayName}</p>
        </div>
        <h4 className="text-xl break-words mb-2">
          <span className="text-xl font-bold text-primary">
            {ranking ? `0${ranking}. ` : ""}
          </span>
          {article.title}
        </h4>
        <p className="text-gray-300">
          {format(new Date(article.createdAt), "MMMM dd")}
          {article.readingTime ? ` · ${article.readingTime} min read` : ""}
        </p>
      </a>
    </Link>
  );
};
