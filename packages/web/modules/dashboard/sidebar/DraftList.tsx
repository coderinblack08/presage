import React from "react";
import { useCollection } from "../../../firebase";
import { Article } from "../../../types";
import { useUser } from "../../auth/useUser";
import { DraftItem } from "./DraftItem";

interface DraftListProps {
  journalId: string;
}

export const DraftList: React.FC<DraftListProps> = ({ journalId }) => {
  const { uid } = useUser();
  const { data } = useCollection<Article>("articles", [
    "drafts",
    journalId,
    uid,
  ]);

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
