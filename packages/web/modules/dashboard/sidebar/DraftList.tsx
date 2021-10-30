import React from "react";
import { useQuery } from "react-query";
import { Article } from "../../../types";
import { DraftItem } from "./DraftItem";

interface DraftListProps {
  journalId: string;
}

export const DraftList: React.FC<DraftListProps> = ({ journalId }) => {
  const { data } = useQuery<Article[]>(
    `/api/journals/drafts?journalId=${journalId}`
  );

  return (
    <ul className={`space-y-1 ${data?.length ? "mb-1" : ""}`}>
      {data?.map((draft) => (
        <li key={draft.id}>
          <DraftItem draft={draft} />
        </li>
      ))}
    </ul>
  );
};
