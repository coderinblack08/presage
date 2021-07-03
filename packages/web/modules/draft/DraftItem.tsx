import Tippy from "@tippyjs/react";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";
import { Paper } from "react-iconly";
import { MdPublic } from "react-icons/md";
import { Article } from "../../lib/types";

interface DraftItemProps {
  article: Article;
}

export const DraftItem: React.FC<DraftItemProps> = ({ article }) => {
  return (
    <Link href="/draft/[id]" as={`/draft/${article.id}`} passHref>
      <a className="focus:outline-none focus-visible:ring rounded-md w-full flex items-center justify-between space-x-4">
        <div className="flex items-center min-w-0">
          <Paper set="bulk" />
          <span className="ml-2 font-bold truncate w-48">
            {article.title || "Untitled"}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <p className="text-gray-300 flex-shrink-0">
            {format(new Date(article.updatedAt), "MMM dd")}
          </p>
          {article.published ? (
            <Tippy
              content={
                <div className="py-1 px-4 rounded-md bg-gray-500">
                  Published
                </div>
              }
            >
              <button className="focus:outline-none">
                <MdPublic className="text-gray-300 w-5 h-5" />
              </button>
            </Tippy>
          ) : null}
        </div>
      </a>
    </Link>
  );
};
