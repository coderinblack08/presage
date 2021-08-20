import { AddOutlined, MoreHoriz } from "@material-ui/icons";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { MdChevronLeft } from "react-icons/md";
import { Button } from "../../../../components/button";
import {
  Journal,
  useCreateBlankArticleMutation,
  useFindDraftsQuery,
} from "../../../../generated/graphql";
import { DraftItem } from "./DraftItem";
import { EmptyDraftState } from "./EmptyDraftState";

interface DraftListProps {
  journal: Journal;
  exit: () => void;
}

export const DraftList: React.FC<DraftListProps> = ({ journal, exit }) => {
  const [, createArticle] = useCreateBlankArticleMutation();
  const [{ data: drafts }] = useFindDraftsQuery({
    variables: { journalId: journal.id },
  });

  const newDraft = async () => {
    try {
      await createArticle({
        journalId: journal.id,
      });
    } catch {}
  };

  return (
    <motion.div
      className="relative h-full"
      initial={{ x: 300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      transition={{ type: "keyframes", duration: 0.3 }}
    >
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center space-x-2">
          <button onClick={exit}>
            <MdChevronLeft className="text-gray-400 w-6 h-6" />
          </button>
          <h2 className="font-bold">{journal.name}</h2>
        </div>
        <div className="flex items-center space-x-3">
          <div
            className="w-5 h-5 flex-shrink-0 rounded-md"
            style={{ backgroundColor: journal.color }}
          />
          <button>
            <MoreHoriz className="text-gray-600" fontSize="small" />
          </button>
        </div>
      </div>
      {drafts?.findDrafts.length === 0 ? (
        <EmptyDraftState journalId={journal.id} />
      ) : (
        <div className="my-4 mx-2 space-y-1">
          {drafts?.findDrafts.map((draft) => (
            <DraftItem key={draft.id} draft={draft as any} />
          ))}
        </div>
      )}
      <button className="flex items-center space-x-2 absolute bottom-0 w-full px-5 py-3 border-t">
        <AddOutlined fontSize="small" className="text-gray-400" />
        <span
          className="text-sm font-semibold text-gray-500"
          onClick={newDraft}
        >
          New Draft
        </span>
      </button>
    </motion.div>
  );
};
