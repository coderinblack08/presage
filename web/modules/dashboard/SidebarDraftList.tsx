import { IconFile, IconFilePlus } from "@tabler/icons";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Article } from "../../lib/types";
import { defaultMutationFn } from "../../lib/defaultMutationFn";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

interface SidebarDraftListProps {}

export const SidebarDraftList: React.FC<SidebarDraftListProps> = ({}) => {
  const { data: drafts } = useQuery<Article[]>("/articles/drafts");
  const { mutateAsync } = useMutation(defaultMutationFn);
  const cache = useQueryClient();

  return (
    <div>
      <Toaster toastOptions={{ position: "top-right" }} />
      {drafts?.map((draft) => (
        <Link href={`/draft/${draft.id}`} key={draft.id} passHref>
          <a className="w-full flex items-center space-x-3 px-4 py-2 rounded-xl group">
            <div className="p-1.5 bg-white inline-flex items-center justify-center rounded-xl shadow border">
              <IconFile className="w-[19px] h-[19px] text-gray-400" />
            </div>
            <p className="text-gray-500 truncate text-sm">{draft?.title}</p>
          </a>
        </Link>
      ))}
      <button
        onClick={async () => {
          await mutateAsync(["/articles", {}, "POST"], {
            onSuccess: (data) => {
              cache.setQueryData<Article[]>("/articles/drafts", (old) => {
                return [...(old || []), data];
              });
            },
          });
          toast.success("New draft created!");
        }}
        className="flex items-center space-x-3 px-4 py-2 rounded-xl w-full"
      >
        <div className="p-1.5 bg-white inline-flex items-center justify-center rounded-xl shadow border">
          <IconFilePlus className="w-[19px] h-[19px] text-gray-400" />
        </div>
        <p className="text-gray-500 truncate text-[13px]">New Entry</p>
      </button>
    </div>
  );
};
