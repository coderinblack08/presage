import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { useRef } from "react";
import { MdClose, MdComment } from "react-icons/md";
import { useMutation } from "react-query";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { mutator } from "../../lib/mutator";
import { Presage } from "../../types";
import { AvatarGroup } from "./AvatarGroup";

interface CommentModalProps {
  presage: Presage;
}

export const CommentModal: React.FC<CommentModalProps> = ({ presage }) => {
  const ref = useRef();
  const [open, setOpen] = useState(false);
  const { mutateAsync } = useMutation(mutator);
  const [comment, setComment] = useState("");

  return (
    <>
      <Button
        icon={<MdComment className="w-6 h-6" />}
        onClick={() => setOpen(true)}
        color="transparent"
        size="sm"
      >
        <span className="font-bold">Comment</span>
      </Button>
      <Modal isOpen={open} closeModal={() => setOpen(false)} initialFocus={ref}>
        <div>
          <div className="flex relative m-1.5 p-5 bg-gray-800 bg-opacity-75 rounded-xl">
            <div>
              <AvatarGroup user={presage.user} />
            </div>
            <div className="absolute right-0 top-0">
              <button
                onClick={() => setOpen(false)}
                className="focus:outline-none m-2"
              >
                <MdClose className="text-gray-300" />
              </button>
            </div>
            <div className="mt-4">
              <Dialog.Title
                as="h6"
                className="font-sans text-gray-100 font-bold"
              >
                {presage.title}
              </Dialog.Title>
              <p className="truncate text-gray-200">{presage.description}</p>
            </div>
          </div>
          <div className="flex space-x-4 m-6 p-0.5 mb-0">
            <img
              src={presage.user.profilePicture}
              alt={presage.user.displayName}
              className="w-9 h-9 rounded-full"
            />
            <div className="w-full">
              <p className="text-gray-200 mb-1">
                Replying to{" "}
                <span className="font-bold">{presage.user.displayName}</span>
              </p>
              <textarea
                ref={ref}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What are you thinking?"
                className="w-full h-20 focus:outline-none bg-gray-900 font-medium placeholder-gray-300 resize-none"
              />
            </div>
          </div>
          <Button
            disabled={comment.trim().length == 0}
            onClick={async () => {
              await mutateAsync([
                "/api/presage",
                { type: "text", content: comment, parentId: presage.id },
                "post",
              ]);
            }}
            className="disabled:opacity-30 float-right m-2"
          >
            Comment
          </Button>
        </div>
      </Modal>
    </>
  );
};
