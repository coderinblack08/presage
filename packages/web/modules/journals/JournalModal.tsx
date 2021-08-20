import { AddOutlined } from "@material-ui/icons";
import { generateColor, journalColors } from "@presage/common";
import { Form, Formik } from "formik";
import React from "react";
import { useRef } from "react";
import * as yup from "yup";
import { Button } from "../../components/button";
import { InputField, TextareaField } from "../../components/input";
import { Modal, ModalTrigger } from "../../components/modal";
import { useCreateJournalMutation } from "../../generated/graphql";
import { ColorSelect } from "./ColorSelect";

interface JournalModalProps {}

export const JournalModal: React.FC<JournalModalProps> = ({}) => {
  const [, createJournal] = useCreateJournalMutation();

  return (
    <Modal
      trigger={
        <ModalTrigger>
          <button className="flex items-center space-x-2 absolute bottom-0 w-full px-5 py-3 border-t">
            <AddOutlined fontSize="small" className="text-gray-400" />
            <span className="text-sm font-semibold text-gray-500">
              Add Journal
            </span>
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
            color: generateColor(),
          }}
          validationSchema={yup.object().shape({
            name: yup.string().max(25).required(),
            description: yup.string().min(5).max(50),
            color: yup.string().oneOf(journalColors).required(),
          })}
          onSubmit={async (values) => {
            try {
              await createJournal({
                data: { ...values, description: values.description || null },
              });
              setOpen(false);
            } catch {}
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-3">
              <ColorSelect />
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
