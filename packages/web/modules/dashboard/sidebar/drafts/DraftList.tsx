import React from "react";
import {
  JournalFragment,
  useFindDraftsQuery,
} from "../../../../generated/graphql";
import { DraftEmptyState } from "./DraftEmptyState";
import { DraftItem } from "./DraftItem";

interface DraftListProps {
  journal: JournalFragment;
}

export const DraftList: React.FC<DraftListProps> = ({ journal }) => {
  const [{ data: drafts, fetching }] = useFindDraftsQuery({
    variables: { journalId: journal.id },
  });

  if (fetching) {
    return null;
  }

  if (drafts?.findDrafts.length === 0) {
    return <DraftEmptyState journalId={journal.id} />;
  }

  return (
    <div className="mt-0 mb-2">
      {drafts?.findDrafts.map((draft) => (
        <DraftItem draft={draft} key={draft.id} />
      ))}
    </div>
  );
};
