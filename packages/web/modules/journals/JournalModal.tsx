import { generateRandomEmoji } from "@presage/common";
import { IconFolderPlus } from "@tabler/icons";
import { Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";
import { Button } from "../../components/button";
import { InputField, TextareaField } from "../../components/input";
import { Modal, ModalTrigger } from "../../components/modal";
import { EmojiSelect } from "./EmojiSelect";
import { useCreateJournalMutation } from "./useJournalMutation";

interface JournalModalProps {}

export const JournalModal: React.FC<JournalModalProps> = ({}) => {
  const { mutateAsync } = useCreateJournalMutation();

  return (
    <Modal
      trigger={
        <ModalTrigger>
          <button className="rounded-lg flex items-center p-2 w-full">
            <div className="p-1 rounded-lg shadow border bg-white flex items-center justify-center mr-3">
              <IconFolderPlus size={20} className="text-gray-400" />
            </div>
            <span className="text-gray-600">New Journal</span>
          </button>
        </ModalTrigger>
      }
      title="New Journal"
      description="Organize your drafts with journals"
    >
      {({ setOpen }) => (
        <Formik
          initialValues={{
            name: "",
            description: "",
            emoji: generateRandomEmoji(),
          }}
          validationSchema={yup.object().shape({
            name: yup.string().max(25).required(),
            description: yup.string().min(5).max(100),
            emoji: yup.string().required(),
          })}
          onSubmit={async (values) => {
            await mutateAsync(values);
            setOpen(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-3">
              <EmojiSelect />
              <InputField placeholder="Name" name="name" outline />
              <TextareaField
                placeholder="Description"
                name="description"
                outline
              />
              <Button
                type="submit"
                loading={isSubmitting}
                color="black"
                className="w-full"
                size="medium"
              >
                Create Journal
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </Modal>
  );
};
