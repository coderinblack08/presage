import { Dialog } from "@headlessui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Delete } from "react-iconly";
import { MdDelete } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { ModalHeader } from "../../components/ModalHeader";
import { mutator } from "../../lib/mutator";
import { Article } from "../../lib/types";

interface DeleteDraftModalProps {
  id: string;
}

export const DeleteDraftModal: React.FC<DeleteDraftModalProps> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync } = useMutation(mutator);
  const queryClient = useQueryClient();
  const router = useRouter();

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        className="focus:outline-none group-hover:block hidden transition"
      >
        <MdDelete className="w-5 h-5" />
      </button>
      <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        <ModalHeader
          handleClose={() => setIsOpen(false)}
          button={
            <Button
              onClick={async () => {
                await mutateAsync([`/articles/${id}`, null, "delete"], {
                  onSuccess: (data) => {
                    const article = queryClient.getQueryData<Article>(
                      `/articles/draft/${id}`
                    );
                    setIsOpen(false);
                    queryClient.setQueryData<Article[]>(
                      `/articles/drafts?journalId=${article?.journalId}`,
                      (old) => {
                        if (old) {
                          const index = old.findIndex((x) => x.id === id);
                          old.splice(index, 1);
                          return old;
                        }
                        return [];
                      }
                    );
                    if (data !== true) {
                      toast(
                        "You must have at least one draft, so we created one for you!",
                        { icon: "🦄" }
                      );
                      queryClient.setQueryData<Article[]>(
                        `/articles/drafts?journalId=${article?.journalId}`,
                        (old) => (old ? [data, ...old] : [])
                      );
                    }
                    queryClient.removeQueries(`/articles/draft/${id}`);
                    router.push("/publish");
                  },
                });
              }}
              size="small"
              icon={<Delete set="bold" size="small" />}
            >
              Delete
            </Button>
          }
        />
        <div className="p-6">
          <Dialog.Title as="h4">Delete Draft</Dialog.Title>
          <p className="text-gray-500">
            Are you sure you want to delete this draft?
          </p>
        </div>
      </Modal>
    </>
  );
};
