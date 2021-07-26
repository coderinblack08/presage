import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { MdDescription } from "react-icons/md";
import { useQuery } from "react-query";
import { Article, Journal } from "../../lib/types";

interface DraftListProps {
  journal: Journal;
}

export const DraftList: React.FC<DraftListProps> = ({ journal }) => {
  const {
    query: { id },
  } = useRouter();
  const { data: drafts } = useQuery<Article[]>(
    `/articles/drafts?journalId=${journal.id}`
  );

  return (
    <ul className="mt-2">
      {drafts?.map((draft) => (
        <li key={draft.id}>
          <Link href={`/draft/${draft.id}`}>
            <a
              className={`py-2 rounded-lg pl-8 pr-3 space-x-2.5 flex items-center ${
                id === draft.id
                  ? "text-gray-900 bg-gray-200/50"
                  : "text-gray-500"
              }`}
            >
              <MdDescription className="w-5 h-5" />
              <div className="font-semibold truncate">{draft.title}</div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};
