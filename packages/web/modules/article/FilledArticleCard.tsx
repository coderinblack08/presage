import { format } from "date-fns";
import Link from "next/link";
import React from "react";
import { MdBookmark, MdChat, MdThumbUp } from "react-icons/md";
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
      <a className="flex flex-col justify-between h-full bg-gray-600/50 border border-gray-600 p-5 pb-4 w-full rounded-lg">
        <div>
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
            <div className="inline-flex items-center space-x-2 mr-1">
              {article.tags.map((x) => (
                <p key={x.id} className="text-gray-300 font-semibold">
                  #<span className="text-gray-200 font-semibold">{x.name}</span>
                </p>
              ))}
            </div>
            {article.tags.length === 0 ? "" : " · "}
            {format(new Date(article.createdAt), "MMMM dd")}
            {article.readingTime ? ` · ${article.readingTime}` : ""}
          </p>
        </div>
        <div className="flex items-center justify-between border-t border-gray-500/50 pt-4 space-x-4 mt-8">
          <Button
            color="transparent"
            size="none"
            className={article.liked ? "text-primary" : "text-gray-200"}
            icon={<MdThumbUp className="w-5 h-5" />}
          >
            <span className="font-semibold">
              {article.points} Like{article.points !== 1 ? "s" : ""}
            </span>
          </Button>
          <Button
            size="none"
            color="transparent"
            className="text-gray-200"
            icon={<MdChat className="w-5 h-5" />}
          >
            <span className="font-semibold">0 Replies</span>
          </Button>
          <Button
            size="none"
            color="transparent"
            className="text-gray-200"
            icon={<MdBookmark className="w-5 h-5" />}
          >
            <span className="font-semibold">Save</span>
          </Button>
        </div>
      </a>
    </Link>
  );
};
