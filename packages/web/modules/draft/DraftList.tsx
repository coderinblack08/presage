import React from "react";
import { useQuery } from "react-query";
import { Article } from "../../lib/types";
import { DraftItem } from "./DraftItem";
import { useNewDraft } from "./useNewDraft";

interface DraftListProps {
  journalId: string | null;
  published: boolean;
}

export const DraftList: React.FC<DraftListProps> = ({
  journalId,
  published,
}) => {
  const { data: drafts } = useQuery<Article[]>(
    `/articles/drafts?journalId=${journalId}&published=${published}`
  );
  const newDraft = useNewDraft();

  return (
    <main className="mt-3">
      {!drafts ? (
        <div className="spinner" />
      ) : drafts?.length === 0 ? (
        <div className="text-gray-400">
          You have no drafts. Start by{" "}
          <button
            onClick={() => newDraft(journalId)}
            className="underline text-gray-600"
          >
            creating one
          </button>
          .
        </div>
      ) : (
        <div className="grid gap-3">
          {drafts?.map((draft) => (
            <DraftItem draft={draft} key={draft.id} />
          ))}
        </div>
      )}
    </main>
  );
};
