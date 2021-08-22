import { IconChevronRight, IconPlus } from "@tabler/icons";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  JournalFragment,
  useCreateBlankArticleMutation,
  useFindArticleQuery,
} from "../../../../generated/graphql";
import { DraftList } from "./DraftList";

interface JournalDisclosureProps {
  journal: JournalFragment;
}

export const JournalDisclosure: React.FC<JournalDisclosureProps> = ({
  journal,
}) => {
  const [open, setOpen] = useState(false);
  const {
    pathname,
    query: { id },
  } = useRouter();

  const [{ data: draft }, execute] = useFindArticleQuery({
    pause: true,
    variables: { id: id?.toString() || "" },
  });
  useEffect(() => {
    if (pathname === "/draft/[id]") {
      execute();
      if (draft?.findArticle?.journalId === journal.id) {
        setOpen(true);
      }
    }
  }, [draft?.findArticle?.journalId, execute, journal.id, pathname]);

  const [, createArticle] = useCreateBlankArticleMutation();
  const newDraft = async () => {
    try {
      await createArticle({ journalId: journal.id });
    } catch {}
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between p-2 w-full text-left"
      >
        <div className="flex items-center min-w-0">
          <div className="p-1 rounded-lg shadow border bg-white flex items-center justify-center mr-3">
            <span className="text-2xl leading-none">{journal.emoji}</span>
          </div>
          <span
            className={`${open ? "font-bold" : "text-gray-600"} transition-all`}
          >
            {journal.name}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          {open && (
            <div
              role="button"
              tabIndex={0}
              onClick={async (e) => {
                e.stopPropagation();
                await newDraft();
              }}
            >
              <IconPlus className="text-gray-400" size={20} />
            </div>
          )}
          <IconChevronRight
            className={`text-gray-400 transition ${
              open ? "rotate-90" : "rotate-0"
            }`}
            size={20}
          />
        </div>
      </button>
      {open && <DraftList journal={journal} />}
    </>
  );
};
