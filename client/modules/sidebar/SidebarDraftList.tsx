import { IconFile, IconFilePlus } from "@tabler/icons";
import React from "react";
import { useQuery } from "react-query";
import { Article } from "../../types";
import { DraftModal } from "../editor/DraftModal";

interface SidebarDraftListProps {}

export const SidebarDraftList: React.FC<SidebarDraftListProps> = ({}) => {
  const { data: drafts } = useQuery<Article[]>("/articles/drafts");

  return (
    <div>
      {drafts?.map((draft) => (
        <DraftModal id={draft.id} key={draft.id} />
      ))}
      <button className="flex items-center space-x-3 px-4 py-2 rounded-xl w-full">
        <div className="p-1.5 bg-white inline-flex items-center justify-center rounded-xl shadow border">
          <IconFilePlus className="w-[19px] h-[19px] text-gray-400" />
        </div>
        <p className="text-gray-600 truncate text-sm">New Entry</p>
      </button>
    </div>
  );
};
