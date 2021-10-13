import { addDoc, getFirestore, serverTimestamp } from "@firebase/firestore";
import { IconChevronRight, IconPlus } from "@tabler/icons";
import { collection } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { mutate } from "swr";
import shallow from "zustand/shallow";
import { Article, Journal } from "../../../types";
import { useUser } from "../../authentication/useUser";
import { DraftList } from "./DraftList";
import { useOpenListsStore } from "./useOpenListsStore";

interface JournalDisclosureProps {
  journal: Journal;
}

export const JournalDisclosure: React.FC<JournalDisclosureProps> = ({
  journal,
}) => {
  const { uid } = useUser();
  const router = useRouter();
  const [openLists, setOpen] = useOpenListsStore(
    (x) => [x.open, x.setOpen],
    shallow
  );
  const open = useMemo(() => openLists.includes(journal.id), [
    openLists,
    journal.id,
  ]);

  return (
    <div>
      <button
        onClick={() => setOpen(journal.id, !open)}
        className="flex items-center justify-between p-2 w-full text-left"
      >
        <div className="flex items-center min-w-0">
          <div className="p-1 rounded-lg shadow border bg-white flex items-center justify-center mr-3">
            <span className="text-2xl leading-none">{journal.emoji}</span>
          </div>
          <span
            className={`${
              open ? "font-semibold" : "text-gray-600"
            } transition-all`}
          >
            {journal.name}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <div
            role="button"
            tabIndex={0}
            className={open ? "block" : "hidden"}
            onClick={async (e) => {
              try {
                e.stopPropagation();
                const data = {
                  userId: uid,
                  journalId: journal.id,
                  title: "Untitled",
                  createdAt: serverTimestamp(),
                  isPublished: false,
                  likeCount: 0,
                  bookmarkCount: 0,
                } as Article;
                const firestore = getFirestore();
                try {
                  const { id } = await addDoc(
                    collection(firestore, "articles"),
                    data
                  );
                  mutate(
                    `/api/journals/drafts?journalId=${journal.id}`,
                    (old: Article[]) => [...(old || []), { ...data, id }],
                    false
                  );
                  router.push(`/draft/${id}`);
                } catch (error) {
                  console.error(error);
                }
              } catch (error) {}
            }}
          >
            <IconPlus className="text-gray-400" size={20} />
          </div>
          <IconChevronRight
            className={`text-gray-400 transition ${
              open ? "rotate-90" : "rotate-0"
            }`}
            size={20}
          />
        </div>
      </button>
      {open && <DraftList journalId={journal.id} />}
    </div>
  );
};
