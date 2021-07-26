import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { MdDelete, MdDescription } from "react-icons/md";
import { useQuery } from "react-query";
import { Button } from "../../components/Button";
import { Article, Journal } from "../../lib/types";
import { DeleteDraftModal } from "./DeleteDraftModal";

interface DraftListProps {
  journal: Journal;
}

export const DraftList: React.FC<DraftListProps> = ({ journal }) => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const { data: drafts } = useQuery<Article[]>(
    `/articles/drafts?journalId=${journal.id}`
  );

  return (
    <ul className="mt-2">
      {drafts?.map((draft) => (
        <li key={draft.id}>
          <div
            onClick={() => {
              router.push(`/draft/${draft.id}`);
            }}
            className={`cursor-pointer group py-2 rounded-lg pl-8 pr-3 flex items-center justify-between ${
              router.query.id === draft.id
                ? "text-gray-900 bg-gray-200/50"
                : "text-gray-500"
            }`}
          >
            <div className="flex items-center space-x-2.5 min-w-0">
              <MdDescription className="w-5 h-5 flex-shrink-0" />
              <div className="font-semibold truncate min-w-0">
                {draft.title}
              </div>
            </div>
            <DeleteDraftModal id={draft.id} />
          </div>
        </li>
      ))}
    </ul>
  );
};
