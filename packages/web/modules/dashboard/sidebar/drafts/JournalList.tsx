import React, { useState } from "react";
import {
  useCreateBlankArticleMutation,
  useFindJournalsQuery,
} from "../../../../generated/graphql";
import { JournalModal } from "../../../journals/JournalModal";
import { JournalDisclosure } from "./JournalDisclosure";

interface JournalListProps {}

export const JournalList: React.FC<JournalListProps> = ({}) => {
  const [{ data: journals }] = useFindJournalsQuery();
  const [journal, setJournal] = useState<string | null>(null);
  const [, createArticle] = useCreateBlankArticleMutation();

  return (
    <div className="relative h-full">
      <div className="px-3 py-4">
        <h4 className="font-bold text-sm mx-2">Journals</h4>
        <ul className="my-2">
          {journals?.findJournals.map((journal) => (
            <li key={journal.id}>
              <JournalDisclosure journal={journal} />
            </li>
          ))}
          <li>
            <JournalModal />
          </li>
        </ul>
      </div>
    </div>
  );
};
