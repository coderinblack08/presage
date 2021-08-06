import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Form, Formik } from "formik";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import {
  MdAdd,
  MdArrowDropDown,
  MdDelete,
  MdEdit,
  MdMoreHoriz,
} from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import * as yup from "yup";
import { Button } from "../../components/Button";
import { InputField } from "../../components/InputField";
import { Modal } from "../../components/Modal";
import { ModalHeader } from "../../components/ModalHeader";
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
  const modalContent = useRef<HTMLDivElement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
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
                  const prompt = window.confirm(
                    `Are you sure you want to delete ${journal.name}`
                  );
                  if (prompt) {
                    await mutateAsync(
                      [`/journals/${journal.id}`, {}, "delete"],
                      {
                        onSuccess: () => {
                          queryClient.setQueryData<Journal[]>(
                            "/journals/me",
                            (old) =>
                              old ? old.filter((x) => x.id !== journal.id) : []
                          );
                          router.push("/publish");
                        },
                      }
                    );
                  }
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
                onSelect={(e) => {
                  // e.preventDefault();
                  setModalOpen(true);
                }}
                className="w-full px-5 py-2.5 text-left focus:outline-none hover:bg-gray-100 focus:bg-gray-100 text-gray-800"
              >
                <div className="flex items-centers">
                  <MdEdit className="w-5 h-5 mr-3" />
                  Edit
                </div>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <Modal
            initialFocus={modalContent}
            isOpen={modalOpen}
            closeModal={() => setModalOpen(false)}
          >
            <div ref={modalContent}>
              <Formik
                initialValues={{
                  name: journal?.name || "",
                  description: journal?.description || "",
                }}
                validationSchema={yup.object().shape({
                  name: yup.string().max(25).required(),
                  description: yup.string().max(100),
                })}
                onSubmit={async (values) => {
                  await mutateAsync(
                    [`/journals/${journal.id}`, values, "patch"],
                    {
                      onSuccess: (data) => {
                        queryClient.setQueryData<Journal>(
                          `/journals/id/${journal.id}`,
                          data
                        );
                        queryClient.setQueryData<Journal[]>(
                          "/journals/me",
                          (old) => {
                            if (old) {
                              const index = old.findIndex(
                                (x) => x.id === journal.id
                              );
                              old[index] = data;
                              return old;
                            }
                            return [];
                          }
                        );
                        setModalOpen(false);
                      },
                    }
                  );
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <ModalHeader
                      button={
                        <Button
                          size="small"
                          type="submit"
                          loading={isSubmitting}
                        >
                          Update
                        </Button>
                      }
                      handleClose={() => setModalOpen(false)}
                    />
                    <div className="space-y-3 p-6">
                      <h4>Edit Journal</h4>
                      <InputField placeholder="Name" name="name" />
                      <InputField
                        placeholder="Description"
                        name="description"
                        className="h-28"
                        textarea
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Modal>
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
