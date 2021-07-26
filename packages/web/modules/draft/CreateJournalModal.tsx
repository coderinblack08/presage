import { Form, Formik } from "formik";
import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import * as yup from "yup";
import { Button } from "../../components/Button";
import { InputField } from "../../components/InputField";
import { Modal } from "../../components/Modal";
import { ModalHeader } from "../../components/ModalHeader";
import { mutator } from "../../lib/mutator";
import { Journal } from "../../lib/types";

interface CreateJournalModalProps {}

export const CreateJournalModal: React.FC<CreateJournalModalProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(mutator);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        icon={<MdAdd className="w-5 h-5 text-gray-500" />}
        size="xsmall"
        color="transparent"
        noAnimate
      />
      <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        <Formik
          initialValues={{ name: "", description: "" }}
          validationSchema={yup.object().shape({
            name: yup.string().max(25).required(),
            description: yup.string().max(100),
          })}
          onSubmit={async (values) => {
            await mutateAsync(["/journals", values, "post"], {
              onSuccess: (data: Journal) => {
                setIsOpen(false);
                queryClient.setQueryData<Journal[]>("/journals/me", (old) =>
                  old ? [...old, data] : [data]
                );
              },
            });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <ModalHeader
                button={
                  <Button loading={isSubmitting} type="submit" size="small">
                    Create
                  </Button>
                }
                handleClose={() => setIsOpen(false)}
              />
              <div className="p-6">
                <div className="space-y-3">
                  <h4>New Journal</h4>
                  <InputField placeholder="Name" name="name" />
                  <InputField
                    placeholder="Description"
                    name="description"
                    textarea
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};
