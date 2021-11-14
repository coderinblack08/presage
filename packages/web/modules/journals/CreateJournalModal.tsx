import { Button, Modal } from "@presage/ui";
import { IconFolderPlus } from "@tabler/icons";
import { Form, Formik } from "formik";
import React from "react";
import create from "zustand";
import { combine } from "zustand/middleware";
import shallow from "zustand/shallow";
import { InputField } from "../../components/InputField";
import { useCreateJournalMutation } from "./useCreateJournalMutation";

interface CreateJournalModalModalProps {}

export const useJournalModalState = create(
  combine({ visible: false }, (set) => ({
    open: () => set({ visible: true }),
    close: () => set({ visible: false }),
  }))
);

export const CreateJournalModal: React.FC<CreateJournalModalModalProps> = ({}) => {
  const { mutateAsync } = useCreateJournalMutation();
  const [visible, close] = useJournalModalState(
    (x) => [x.visible, x.close],
    shallow
  );

  return (
    <>
      <Modal visible={visible} onCancel={close}>
        {() => (
          <div>
            <h1 className="text-xl font-bold">Create Journal</h1>
            <p className="text-gray-500 mt-1">
              Organize your drafts into convenient journals
            </p>
            <Formik
              initialValues={{ name: "", description: "", icon: "" }}
              onSubmit={async (values) => {
                await mutateAsync(values);
              }}
            >
              <Form className="space-y-4 mt-4">
                <InputField name="name" placeholder="Name" />
                <InputField
                  name="description"
                  placeholder="Description"
                  textarea
                />
                <div className="flex items-center space-x-2">
                  <Button
                    type="submit"
                    icon={
                      <IconFolderPlus size={20} className="text-purple-300" />
                    }
                  >
                    Submit
                  </Button>
                  <Button
                    onClick={close}
                    type="button"
                    color="secondary"
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Formik>
          </div>
        )}
      </Modal>
    </>
  );
};
