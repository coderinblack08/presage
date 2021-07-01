import { Dialog } from "@headlessui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Delete } from "react-iconly";
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
      <Button
        onClick={() => setIsOpen(true)}
        icon={
          <div className="scale-80">
            <Delete set="bulk" />
          </div>
        }
        color="transparent"
        size="none"
        type="button"
      >
        <span className="text-gray-300 font-semibold">Delete Draft</span>
      </Button>
      <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        <ModalHeader
          handleClose={() => setIsOpen(false)}
          button={
            <Button
              onClick={async () => {
                await mutateAsync([`/articles/${id}`, null, "delete"], {
                  onSuccess: () => {
                    queryClient.setQueryData<Article[]>(
                      "/articles/drafts",
                      (old) => {
                        if (old) {
                          const index = old.findIndex((x) => x.id === id);
                          old.splice(index, 1);
                          return old;
                        }
                        return [];
                      }
                    );
                    router.push("/publish");
                  },
                });
                setIsOpen(false);
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
          <p className="text-gray-300">
            Are you sure you want to delete this draft?
          </p>
        </div>
      </Modal>
    </>
  );
};
