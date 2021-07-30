import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  MdAdd,
  MdArrowDropDown,
  MdDelete,
  MdEdit,
  MdMoreHoriz,
} from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { Button } from "../../components/Button";
import { useSSRQuery } from "../../lib/hooks/useSSRQuery";
import { mutator } from "../../lib/mutator";
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
  const router = useRouter();
  const { data: draft } = useSSRQuery<Article>(
    id ? `/articles/draft/${id}` : ""
  );
  const { mutateAsync } = useMutation(mutator);
  const [open, setOpen] = useState(draft?.journalId === journal.id);
  const [initialized, setInitialized] = useState(false);
  const queryClient = useQueryClient();
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
        <div className="flex items-center space-x-2">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="focus:outline-none">
              <MdMoreHoriz className="w-5 h-5 text-gray-500" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className=" bg-white rounded-lg shadow-lg py-2 w-48 mt-2">
              <DropdownMenu.Item
                as="button"
                onSelect={async () => {
                  await mutateAsync([`/journals/${journal.id}`, {}, "delete"], {
                    onSuccess: () => {
                      queryClient.setQueryData<Journal[]>(
                        "/journals/me",
                        (old) =>
                          old ? old.filter((x) => x.id !== journal.id) : []
                      );
                      router.push("/publish");
                    },
                  });
                }}
                className="w-full px-5 py-2.5 text-left focus:outline-none hover:bg-gray-100 focus:bg-gray-100 text-gray-800"
              >
                <div className="flex items-center">
                  <MdDelete className="w-5 h-5 mr-3" />
                  Delete
                </div>
              </DropdownMenu.Item>
              <DropdownMenu.Item
                as="button"
                className="w-full px-5 py-2.5 text-left focus:outline-none hover:bg-gray-100 focus:bg-gray-100 text-gray-800"
              >
                <div className="flex items-center">
                  <MdEdit className="w-5 h-5 mr-3" />
                  Edit
                </div>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
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
