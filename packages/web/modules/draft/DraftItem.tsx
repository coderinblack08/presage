import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
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
      <a className="group focus:outline-none focus-visible:ring rounded-md w-full flex items-center justify-between space-x-4">
        <div className="flex items-center min-w-0">
          <Paper set="bulk" />
          <span className="ml-2 font-bold truncate">
            {article.title || "Untitled"}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <p className="text-gray-300 flex-shrink-0">
            {format(new Date(article.updatedAt), "MMM dd")}
          </p>
          {article.published ? (
            <Tippy content={<span>Tooltip</span>}>
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
