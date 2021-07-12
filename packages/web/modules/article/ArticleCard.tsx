import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import React from "react";
import { Bookmark, Chat, Heart } from "react-iconly";
import { Button } from "../../components/Button";
import { Article } from "../../lib/types";
import { Tags } from "./Tags";

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Link href="/article/[id]" as={`/article/${article.id}`}>
      <a className="flex flex-col justify-between bg-white rounded-lg shadow p-6">
        <div>
          <div className="flex items-start space-x-3">
            <img
              src={article.user.profilePicture}
              alt={article.user.displayName}
              className="w-6 h-6 rounded-full"
            />
            <div>
              <p className="font-semibold text-gray-800 leading-none">
                {article.user.displayName}
              </p>
              <p className="small text-gray-500 leading-none mt-2">
                {formatDistanceToNow(new Date(article.createdAt), {
                  addSuffix: true,
                }).replace("about ", "")}
              </p>
            </div>
          </div>
          <h4 className="mt-3">{article.title}</h4>
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
                <div className="text-gray-600">
                  <Heart
                    set={article.liked ? "bold" : "light"}
                    stroke="bold"
                    size="small"
                  />
                </div>
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
                  <Chat set="light" stroke="bold" size="small" />
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
          <Button
            icon={<Bookmark set="light" stroke="bold" size="small" />}
            rounded
          >
            Save
          </Button>
        </div>
      </a>
    </Link>
  );
};
