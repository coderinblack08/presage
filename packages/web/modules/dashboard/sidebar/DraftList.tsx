import React from "react";
import useSWR from "swr";
import { Article } from "../../../types";
import { DraftItem } from "./DraftItem";

interface DraftListProps {
  journalId: string;
}

export const DraftList: React.FC<DraftListProps> = ({ journalId }) => {
  const { data } = useSWR<Article[]>(
    `/api/journals/drafts?journalId=${journalId}`
  );

  return (
    <ul className={data?.length ? "mb-2" : ""}>
      {data?.map((draft) => (
        <li key={draft.id}>
          <DraftItem draft={draft} />
        </li>
      ))}
    </ul>
  );
};
