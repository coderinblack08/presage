import { useRouter } from "next/router";
import React from "react";
import { PaperPlus } from "react-iconly";
import { AiFillRightCircle } from "react-icons/ai";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { mutator } from "../../lib/mutator";
import { Article } from "../../lib/types";
import { DraftItem } from "./DraftItem";

interface DraftNavigatorProps {}

export const DraftNavigator: React.FC<DraftNavigatorProps> = ({}) => {
  const { mutateAsync } = useMutation(mutator);
  const { data: articles } = useQuery<Article[]>("/articles/drafts");
  const queryClient = useQueryClient();
  const router = useRouter();

  return (
    <nav className="w-80 flex-shrink-0">
      <div className="flex items-center justify-between mb-4">
        <h5 className="uppercase font-bold text-gray-300 small w-48">Drafts</h5>
        <button className="rotate-180">
          <AiFillRightCircle className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-5">
        {articles?.map((article) => (
          <DraftItem key={article.id} article={article} />
        ))}
      </div>
      <div className="border-b border-gray-600 w-full mt-5 mb-4" />
      <button
        onClick={async () => {
          await mutateAsync(["/articles", null, "post"], {
            onSuccess: (data: Article) => {
              queryClient.setQueryData<Article[]>("/articles/drafts", (old) => [
                data,
                ...(old || []),
              ]);
              router.push("/draft/[id]", `/draft/${data.id}`);
            },
          });
        }}
        className="flex items-center w-full text-primary focus:outline-none focus-visible:ring rounded-md"
      >
        <PaperPlus set="bold" />
        <span className="ml-2 font-bold">New Folder or Draft</span>
      </button>
    </nav>
  );
};
