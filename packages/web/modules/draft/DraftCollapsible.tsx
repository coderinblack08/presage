import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MdAdd, MdArrowDropDown, MdMoreHoriz } from "react-icons/md";
import { Button } from "../../components/Button";
import { useSSRQuery } from "../../lib/hooks/useSSRQuery";
import { Article, Journal } from "../../lib/types";
import { DraftList } from "./DraftList";
import { useNewDraft } from "./useNewDraft";

interface DraftCollapsibleProps {
  journal: Journal;
}

export const DraftCollapsible: React.FC<DraftCollapsibleProps> = ({
  journal,
}) => {
  const {
    query: { id },
  } = useRouter();
  const { data: draft } = useSSRQuery<Article>(
    id ? `/articles/draft/${id}` : ""
  );
  const [open, setOpen] = useState(draft?.journalId === journal.id);
  const [initialized, setInitialized] = useState(false);
  const newDraft = useNewDraft();

  useEffect(() => {
    if (
      open === false &&
      !initialized &&
      id &&
      draft?.journalId === journal.id
    ) {
      setOpen(true);
      setInitialized(true);
    }
  }, [draft?.journalId, id, initialized, journal.id, open]);

  return (
    <div key={journal.id} className="mt-3">
      <div className="group flex items-center justify-between h-6">
        <Button
          onClick={() => {
            setInitialized(true);
            setOpen(!open);
          }}
          icon={
            <MdArrowDropDown
              className={`text-gray-600 w-6 h-6 ${open ? "" : "-rotate-90"}`}
            />
          }
          color="transparent"
          size="none"
          noAnimate
        >
          <div className="text-gray-600 font-bold">{journal.name}</div>
        </Button>
        <div className="hidden group-hover:flex items-center space-x-2">
          <Button
            icon={<MdMoreHoriz className="w-5 h-5 text-gray-500" />}
            size="xsmall"
            color="transparent"
          />
          <Button
            onClick={() => newDraft(journal.id)}
            icon={<MdAdd className="w-5 h-5 text-gray-500" />}
            size="xsmall"
            color="transparent"
          />
        </div>
      </div>
      <AnimatePresence initial={false}>
        {open && <DraftList journal={journal} />}
      </AnimatePresence>
    </div>
  );
};
