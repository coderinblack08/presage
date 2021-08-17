import React from "react";
import { useFindJournalsQuery } from "../../src/generated/graphql";

interface JournalListProps {}

export const JournalList: React.FC<JournalListProps> = ({}) => {
  const [{ data: journals }] = useFindJournalsQuery();

  return (
    <ul>
      {journals?.findJournals.length === 0 ? (
        <p className="text-gray-400 text-sm">
          Create a journal to start writing
        </p>
      ) : null}
      {journals?.findJournals.map((journal) => (
        <li key={journal.id}>
          <button className="py-1 w-full text-left flex items-center space-x-3">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: journal.color }}
            />
            <span className="text-sm text-gray-600">{journal.name}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};
