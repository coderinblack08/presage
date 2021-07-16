import * as yup from "yup";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button } from "../../components/Button";
import { InputField } from "../../components/InputField";
import { Modal } from "../../components/Modal";
import { ModalHeader } from "../../components/ModalHeader";
import { mutator } from "../../lib/mutator";
import { Journal } from "../../lib/types";

interface JournalNavbarProps {
  updateJournal: (id: string) => void;
  currentJournal: string | null;
}

export const JournalNavbar: React.FC<JournalNavbarProps> = ({
  currentJournal,
  updateJournal,
}) => {
  const { data: journals } = useQuery<Journal[]>(`/articles/my-journals`);
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(mutator);

  return (
    <nav className="flex items-stretch h-9 rounded-lg overflow-hidden bg-white divide-x divide-gray-200 border border-gray-200 shadow-sm">
      {journals?.map((journal) => (
        <button
          key={journal.id}
          onClick={() => updateJournal(journal.id)}
          className={`h-full flex items-center space-x-2.5 px-3.5 focus:outline-none  ${
            currentJournal === journal.id ? "bg-white" : "bg-gray-50"
          }`}
        >
          <img
            src={journal.picture}
            alt={journal.name}
            className="flex-shrink-0 w-5 h-5 object-cover rounded-full"
          />
          <p className="text-gray-800 font-semibold">{journal.name}</p>
        </button>
      ))}
      <button
        onClick={() => setIsOpen(true)}
        className="h-full bg-gray-50 flex items-center space-x-2 px-3.5 focus:outline-none"
      >
        <MdAdd />
      </button>
      <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        <Formik
          initialValues={{ name: "", description: "" }}
          validationSchema={yup.object().shape({
            name: yup.string().max(25).required(),
            description: yup.string().max(100),
          })}
          onSubmit={async (values) => {
            console.log(values);

            await mutateAsync(["/articles/journal", values, "post"], {
              onSuccess: (data: Journal) => {
                setIsOpen(false);
                queryClient.setQueryData<Journal[]>(
                  "/articles/my-journals",
                  (old) => (old ? [...old, data] : [data])
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
    </nav>
  );
};
