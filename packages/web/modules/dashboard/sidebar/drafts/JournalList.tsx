import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import React from "react";
import { useState } from "react";
import { useFindJournalsQuery } from "../../../../generated/graphql";
import { DraftList } from "./DraftList";
import { JournalModal } from "../../../journals/JournalModal";

interface JournalListProps {}

export const JournalList: React.FC<JournalListProps> = ({}) => {
  const [{ data: journals }] = useFindJournalsQuery();
  const [journal, setJournal] = useState<string | null>(null);

  return (
    <AnimatePresence initial={false}>
      {journal ? (
        <DraftList
          journal={journals?.findJournals.find((x) => x.id === journal) as any}
          exit={() => setJournal(null)}
        />
      ) : (
        <motion.div
          className="relative h-full"
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{ type: "keyframes", duration: 0.3 }}
        >
          <div className="px-7 py-6">
            <h4 className="font-bold text-sm">My Journals</h4>
            <ul className="my-3">
              {journals?.findJournals.length === 0 ? (
                <p className="text-gray-400 text-sm">
                  Create a journal to start writing
                </p>
              ) : null}
              {journals?.findJournals.map((journal) => (
                <li key={journal.id}>
                  <button
                    className="py-2 w-full text-left flex items-center justify-between"
                    onClick={() => setJournal(journal.id)}
                  >
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
          </div>
          <JournalModal />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
