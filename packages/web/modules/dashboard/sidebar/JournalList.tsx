import React from "react";
import useSWR from "swr";
import { Journal } from "../../../types";
import { JournalModal } from "../../journals/JournalModal";
import { JournalDisclosure } from "./JournalDisclosure";

interface JournalListProps {}

export const JournalList: React.FC<JournalListProps> = ({}) => {
  const { data } = useSWR<Journal[]>("/api/journals");

  return (
    <div className="px-3 py-4">
      <h4 className="font-bold text-sm mx-2">Journals</h4>
      <ul className="mt-1">
        {data?.map((journal) => (
          <li key={journal.id}>
            <JournalDisclosure journal={journal} />
          </li>
        ))}
        <li>
          <JournalModal />
        </li>
      </ul>
    </div>
  );
};
