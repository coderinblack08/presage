import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import React from "react";
import {
  MdBookmarkBorder,
  MdChatBubbleOutline,
  MdFavorite,
  MdFavoriteBorder,
} from "react-icons/md";
import { Button } from "../../components/Button";
import { Article } from "../../lib/types";
import { Tags } from "./Tags";

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const date = new Date(article.publishedDate || article.createdAt);

  return (
    <Link href="/article/[id]" as={`/article/${article.id}`}>
      <a className="flex flex-col justify-between bg-white rounded-xl shadow p-6">
        <div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={article.journal.picture}
                alt={article.journal.name}
                className="w-9 h-9 rounded-full"
              />
              <img
                src={article.user.profilePicture}
                alt={article.user.displayName}
                className="absolute -bottom-1 -right-1 ring-2 ring-white w-5 h-5 rounded-full"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-800 leading-none">
                {article.user.displayName}{" "}
                <span className="text-gray-600">in</span> {article.journal.name}
              </p>
              <p className="small text-gray-500 leading-none mt-2">
                {formatDistanceToNow(date, {
                  addSuffix: true,
                }).replace("about ", "")}
              </p>
            </div>
          </div>
          <h4 className="mt-6">{article.title}</h4>
          <div className="text-gray-600 mt-1">
            {article.readingTime}
            {article.tags.length > 0 ? " · " : null}
            <Tags article={article} />
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              color="gray"
              size="small"
              icon={
                article.liked ? (
                  <MdFavorite className="text-gray-600 w-5 h-5" />
                ) : (
                  <MdFavoriteBorder className="text-gray-600 w-5 h-5" />
                )
              }
              noAnimate
            >
              <p className="text-gray-600 font-semibold">
                {article.points}{" "}
                <span className="hidden lg:inline font-semibold">
                  like{article.points !== 1 ? "s" : ""}
                </span>
              </p>
            </Button>
            <Button
              color="transparent"
              size="small"
              icon={
                <div className="text-gray-600">
                  <MdChatBubbleOutline className="text-gray-600 w-5 h-5" />
                </div>
              }
              noAnimate
            >
              <p className="text-gray-600 font-semibold">
                0{" "}
                <span className="hidden lg:inline font-semibold">comments</span>
              </p>
            </Button>
          </div>
          <Button>Save</Button>
        </div>
      </a>
    </Link>
  );
};
