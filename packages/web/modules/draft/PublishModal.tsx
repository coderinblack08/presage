import { Dialog } from "@headlessui/react";
import { useFormikContext } from "formik";
import React, { useState } from "react";
import { MdPublish } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Modal } from "../../components/Modal";
import { ModalHeader } from "../../components/ModalHeader";
import { mutator } from "../../lib/mutator";
import { Article } from "../../lib/types";

interface PublishModalProps {
  id: string;
}

export const PublishModal: React.FC<PublishModalProps> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isValid } = useFormikContext();
  const [tags, setTags] = useState("");
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(mutator);

  return (
    <>
      <Button
        onClick={() => isValid && setIsOpen(true)}
        icon={<MdPublish className="w-5 h-5" />}
      >
        Publish
      </Button>
      <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        <ModalHeader
          handleClose={() => setIsOpen(false)}
          button={
            <Button
              size="small"
              onClick={async () => {
                const tagsArray = tags.split(/,\s{0,}/g);
                await mutateAsync(
                  [`/articles/publish/${id}`, { tags: tagsArray }, "post"],
                  {
                    onSuccess: (data) => {
                      queryClient.setQueryData<Article>(
                        `/articles/${id}`,
                        (old) =>
                          ({
                            ...(old || {}),
                            published: true,
                            tags: data,
                          } as any)
                      );
                    },
                  }
                );
                setIsOpen(false);
              }}
            >
              Publish
            </Button>
          }
        />
        <div className="p-6">
          <Dialog.Title as="h4">Publish Draft</Dialog.Title>
          <p className="text-primary">As Kevin Lu</p>
          <p className="mt-6 text-gray-300">
            Enter a list of comma separated tags (up to 5)
          </p>
          <div className="mt-2">
            <Input
              name="tags"
              onChange={(e) => setTags(e.target.value)}
              value={tags}
              placeholder="Movie, Review, Star Wars"
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
