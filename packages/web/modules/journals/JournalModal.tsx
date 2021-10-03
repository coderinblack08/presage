import { collection, getFirestore } from "firebase/firestore";
import { generateRandomEmoji } from "@presage/common";
import { IconFolderPlus } from "@tabler/icons";
import { Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";
import { Button } from "../../components/button";
import { InputField, TextareaField } from "../../components/input";
import { Modal, ModalTrigger } from "../../components/modal";
import { useUser } from "../auth/useUser";
import { EmojiSelect } from "./EmojiSelect";
import { setDoc } from "../../firebase";

interface JournalModalProps {}

export const JournalModal: React.FC<JournalModalProps> = ({}) => {
  const { uid } = useUser();

  return (
    <Modal
      trigger={
        <ModalTrigger>
          <button className="rounded-lg flex items-center justify-center p-2">
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
              await setDoc("journals", { ...values, userId: uid });
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
