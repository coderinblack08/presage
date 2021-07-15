import { useRouter } from "next/router";
import React from "react";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { mutator } from "../../lib/mutator";
import { Article } from "../../lib/types";
import { DraftItem } from "./DraftItem";
import { useNewDraft } from "./useNewDraft";

interface DraftListProps {
  journalId: string | null;
}

export const DraftList: React.FC<DraftListProps> = ({ journalId }) => {
  const { data: drafts } = useQuery<Article[]>(
    `/articles/drafts?journalId=${journalId}`
  );
  const newDraft = useNewDraft();

  return (
    <main className="mt-4">
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
