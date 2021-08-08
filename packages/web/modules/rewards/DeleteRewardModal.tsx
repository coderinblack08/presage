import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { Delete } from "react-iconly";
import { MdDelete } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { ModalHeader } from "../../components/ModalHeader";
import { mutator } from "../../lib/mutator";
import { Reward } from "../../lib/types";

interface DeleteRewardModalProps {
  id: string;
}

export const DeleteRewardModal: React.FC<DeleteRewardModalProps> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync } = useMutation(mutator);
  const queryClient = useQueryClient();

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
                await mutateAsync([`/rewards/${id}`, null, "delete"], {
                  onSuccess: () => {
                    queryClient.setQueryData<Reward[]>("/rewards", (old) => {
                      if (old) {
                        const index = old.findIndex((x) => x.id === id);
                        old.splice(index, 1);
                        return old;
                      }
                      return [];
                    });
                    setIsOpen(false);
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
          <Dialog.Title as="h4">Delete Reward</Dialog.Title>
          <p className="text-gray-500 mt-1">
            Are you sure you want to delete this reward? All users who claimed
            this reward that are still pending will be refunded in full. Note
            that{" "}
            <span className="text-gray-900 font-semibold">
              all current shoutouts will still go through.
            </span>
          </p>
        </div>
      </Modal>
    </>
  );
};
