import { ChevronRightOutlined } from "@material-ui/icons";
import React from "react";
import { useFindJournalsQuery } from "../../generated/graphql";

interface JournalListProps {}

export const JournalList: React.FC<JournalListProps> = ({}) => {
  const [{ data: journals }] = useFindJournalsQuery();

  return (
    <ul className="my-2.5">
      {journals?.findJournals.length === 0 ? (
        <p className="text-gray-400 text-sm">
          Create a journal to start writing
        </p>
      ) : null}
      {journals?.findJournals.map((journal) => (
        <li key={journal.id}>
          <button className="py-2 w-full text-left flex items-center justify-between">
            <div className="flex items-center space-x-3 min-w-0">
              <div
                className="w-[16px] h-[16px] flex-shrink-0 rounded-md"
                style={{ backgroundColor: journal.color }}
              />
              <span className="text-gray-600 text-[13px] truncate">
                {journal.name}
              </span>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
};
