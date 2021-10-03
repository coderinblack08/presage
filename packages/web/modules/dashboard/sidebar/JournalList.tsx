// Get it, JournalList?? Journalist?? Nevermind that wasn't funny.

import React from "react";
import { useCollection } from "../../../firebase";
import { Journal } from "../../../types";
import { useUser } from "../../auth/useUser";
import { JournalModal } from "../../journals/JournalModal";
import { JournalDisclosure } from "./JournalDisclosure";

interface JournalListProps {}

export const JournalList: React.FC<JournalListProps> = ({}) => {
  const { uid } = useUser();
  const { data, isValidating } = useCollection<Journal>("journals", [
    "my-journals",
    uid,
  ]);

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
