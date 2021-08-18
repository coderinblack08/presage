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
          <Button
            icon={
              <AddOutlined fontSize="small" className="text-gray-400 -mr-1" />
            }
            color="transparent"
            size="none"
          >
            <span className="text-sm font-semibold text-gray-500">
              Add Journal
            </span>
          </Button>
        </ModalTrigger>
      }
      title="New Journal"
      description="Organize your drafts with journals"
    >
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
    </Modal>
  );
};
