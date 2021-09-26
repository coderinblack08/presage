import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "@firebase/firestore";
import React, { useState, useMemo } from "react";
import { MdAdd, MdChevronRight } from "react-icons/md";
import useSWR from "swr";
import { snapshotToArray } from "../../lib/snapshotToArray";
import { Journal } from "../../types";
import { useUser } from "../auth/useUser";

interface JournalCardProps {
  journal: Journal;
}

export const JournalCard: React.FC<JournalCardProps> = ({ journal }) => {
  const [open, setOpen] = useState(false);
  const firestore = useMemo(() => getFirestore(), []);
  const { uid } = useUser();
  const { data: drafts } = useSWR(["drafts", journal.id], async () => {
    const snapshot = await getDocs(
      query(
        collection(firestore, "articles"),
        // where("journalId", "==", journal.id),
        orderBy("createdAt", "desc")
      )
    );
    return snapshotToArray(snapshot);
  });

  return (
    <div className="rounded-lg border shadow-sm max-w-md">
      <button onClick={() => setOpen(!open)} className="p-4 w-full text-left">
        <div className="flex items-center justify-between">
          <div className="flex items-center min-w-0">
            <div className="p-1 rounded-lg shadow border bg-white flex items-center justify-center mr-3">
              <span className="text-2xl leading-none">{journal.emoji}</span>
            </div>
            <span className={`font-semibold transition-all`}>
              {journal.name}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <MdChevronRight
              className={`text-gray-400 w-7 h-7 transition ${
                open ? "rotate-90" : "rotate-0"
              }`}
            />
          </div>
        </div>
        <p className="text-gray-500 mt-2 text-[13px]">{journal.description}</p>
      </button>
      <pre>{JSON.stringify(drafts, null, 2)}</pre>
      {open ? (
        <>
          <hr />
          <ul className="p-2">
            {drafts?.map((draft) => (
              <li key={draft.id}>
                <a
                  className={`flex items-center space-x-3 p-2 rounded-lg text-gray-500`}
                >
                  <div className="rounded-lg bg-white border shadow-sm p-1">
                    <svg
                      className={"text-gray-400"}
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.25 3.75003V14.25H3.75V3.75003H14.25ZM14.25 2.25003H3.75C2.925 2.25003 2.25 2.92503 2.25 3.75003V14.25C2.25 15.075 2.925 15.75 3.75 15.75H14.25C15.075 15.75 15.75 15.075 15.75 14.25V3.75003C15.75 2.92503 15.075 2.25003 14.25 2.25003Z"
                        fill="currentColor"
                      />
                      <path
                        d="M10.5 11.25H5.25V9.75003H10.5V11.25ZM12.75 8.25003H5.25V6.75003H12.75V8.25003Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-[13px] truncate">
                    {draft.title}
                  </h3>
                </a>
              </li>
            ))}
            <div
              role="button"
              tabIndex={0}
              onClick={async (e) => {
                e.stopPropagation();
                const { id } = await addDoc(collection(firestore, "articles"), {
                  title: "Untitled",
                  published: false,
                  journalId: journal.id,
                  userId: uid,
                  createdAt: serverTimestamp(),
                });
                await updateDoc(doc(firestore, "journals", journal.id), {
                  drafts: arrayUnion(id),
                });
              }}
              className={`flex items-center space-x-3 p-2 rounded-lg text-gray-500`}
            >
              <div className="inline-block rounded-lg bg-white border shadow-sm p-1">
                <MdAdd className="text-gray-400 w-[18px] h-[18px]" />
              </div>
              <h3 className="font-semibold text-[13px] truncate">New Draft</h3>
            </div>
          </ul>
        </>
      ) : null}
    </div>
  );
};
