import { IconFolderPlus } from "@tabler/icons";
import { generateRandomEmoji } from "@presage/common";
import { Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";
import { Button } from "../../components/button";
import { InputField, TextareaField } from "../../components/input";
import { Modal, ModalTrigger } from "../../components/modal";
import { useCreateJournalMutation } from "../../generated/graphql";
import { EmojiSelect } from "./EmojiSelect";

interface JournalModalProps {}

export const JournalModal: React.FC<JournalModalProps> = ({}) => {
  const [, createJournal] = useCreateJournalMutation();

  return (
    <Modal
      trigger={
        <ModalTrigger>
          <button className="flex items-center w-full p-2">
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
            try {
              console.log(values);

              await createJournal({
                data: { ...values, description: values.description || null },
              });
              setOpen(false);
            } catch {}
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
