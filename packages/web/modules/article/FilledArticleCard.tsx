import { format } from "date-fns";
import Link from "next/link";
import React from "react";
import { MdChatBubble, MdThumbUp } from "react-icons/md";
import { Button } from "../../components/Button";
import { Article } from "../../lib/types";

interface FilledArticleCardProps {
  article: Article;
  ranking?: number;
}

export const FilledArticleCard: React.FC<FilledArticleCardProps> = ({
  article,
  ranking,
}) => {
  return (
    <Link href="/article/[id]" as={`/article/${article.id}`}>
      <a className="block bg-gray-600/50 p-5 w-full rounded-lg">
        <div className="flex items-center space-x-3 mb-3">
          <img
            src={article.user.profilePicture}
            className="w-6 h-6 rounded-full"
            alt={article.user.displayName}
          />
          <p className="font-bold">{article.user.displayName}</p>
        </div>
        <h4 className="text-xl break-words mb-1">
          <span className="text-xl font-bold text-primary">
            {ranking ? `0${ranking}. ` : ""}
          </span>
          {article.title}
        </h4>
        <p className="text-gray-300">
          {format(new Date(article.createdAt), "MMMM dd")}
          {article.readingTime ? ` · ${article.readingTime}` : ""}
        </p>
        <div className="flex items-center space-x-4 mt-6">
          <Button
            color="transparent"
            className="bg-opacity-10 !bg-gray-500/50 text-gray-200"
            icon={<MdThumbUp className="w-5 h-5" />}
          >
            0 · Like
          </Button>
          <Button
            color="transparent"
            icon={<MdChatBubble className="w-5 h-5" />}
          >
            Comment
          </Button>
        </div>
      </a>
    </Link>
  );
};
