import React from "react";
import { format } from "date-fns";
import { Paper, PaperPlus } from "react-iconly";
import { AiFillRightCircle } from "react-icons/ai";
import { useMutation, useQuery } from "react-query";
import { mutator } from "../../lib/mutator";
import { Article } from "../../lib/types";
import { useEditorStore } from "./useEditorStore";

interface DraftNavigatorProps {}

export const DraftNavigator: React.FC<DraftNavigatorProps> = ({}) => {
  const { mutateAsync } = useMutation(mutator);
  const { data: articles } = useQuery<Article[]>("/articles/drafts");
  const setDraft = useEditorStore((x) => x.setDraft);

  return (
    <nav className="w-80 flex-shrink-0">
      <div className="flex items-center justify-between mb-4">
        <h5 className="uppercase font-bold text-gray-300 small">Drafts</h5>
        <button className="rotate-180">
          <AiFillRightCircle className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-5">
        {articles?.map((article) => (
          <button
            onClick={() => setDraft(article.id)}
            className="focus:outline-none focus-visible:ring rounded-md w-full flex items-center justify-between space-x-4"
            key={article.id}
          >
            <div className="flex items-center min-w-0">
              <Paper set="bulk" />
              <span className="ml-2 font-bold truncate">
                {article.title || "Untitled"}
              </span>
            </div>
            <p className="text-gray-300 flex-shrink-0">
              {format(new Date(article.updatedAt), "MMM dd")}
            </p>
          </button>
        ))}
      </div>
      <div className="border-b border-gray-600 w-full mt-5 mb-4" />
      <button
        onClick={async () => {
          await mutateAsync(["/articles", null, "post"]);
        }}
        className="flex items-center w-full text-primary focus:outline-none focus-visible:ring rounded-md"
      >
        <PaperPlus set="bold" />
        <span className="ml-2 font-bold">New Folder or Draft</span>
      </button>
    </nav>
  );
};
