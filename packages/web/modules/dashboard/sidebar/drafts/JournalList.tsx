import { IconChevronRight } from "@tabler/icons";
import React, { useState } from "react";
import { useFindJournalsQuery } from "../../../../generated/graphql";
import { JournalModal } from "../../../journals/JournalModal";

interface JournalListProps {}

export const JournalList: React.FC<JournalListProps> = ({}) => {
  const [{ data: journals }] = useFindJournalsQuery();
  const [journal, setJournal] = useState<string | null>(null);

  return (
    <div className="relative h-full">
      <div className="px-3 py-4">
        <h4 className="font-bold text-sm mx-2">Journals</h4>
        <ul className="my-2">
          {journals?.findJournals.map((journal) => (
            <li key={journal.id}>
              <button
                className="flex items-center justify-between p-2 w-full text-left"
                onClick={() => setJournal(journal.id)}
              >
                <div className="flex items-center min-w-0">
                  <div className="p-1 rounded-lg shadow border bg-white flex items-center justify-center mr-3">
                    <span className="text-2xl leading-none">
                      {journal.emoji}
                    </span>
                  </div>
                  <span className="text-gray-600">{journal.name}</span>
                </div>
                <IconChevronRight className="text-gray-400" size={20} />
              </button>
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
