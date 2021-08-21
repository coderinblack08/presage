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
    <ul className="mt-1 mb-3 space-y-1">
      {drafts?.findDrafts.map((draft) => (
        <DraftItem draft={draft} key={draft.id} />
      ))}
    </ul>
  );
};
