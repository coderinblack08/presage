import { Modal } from "@presage/ui";
import React from "react";
import { MutateJournalForm } from "./MutateJournalForm";
import { useCreateJournalMutation } from "./useCreateJournalMutation";

interface CreateJournalModalModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const CreateJournalModal: React.FC<CreateJournalModalModalProps> = ({
  visible,
  setVisible,
}) => {
  const { mutateAsync } = useCreateJournalMutation();

  function cancel() {
    setVisible(false);
  }

  return (
    <Modal visible={visible} onCancel={cancel}>
      {() => (
        <div>
          <h1 className="text-xl font-bold">Create Journal</h1>
          <p className="text-gray-500 mt-1">
            Organize your drafts into convenient journals
          </p>
          <MutateJournalForm
            close={cancel}
            action={async (values) => {
              try {
                await mutateAsync(values, {
                  onSuccess: () => {
                    close();
                  },
                });
              } catch (error) {
                console.error(error);
              }
            }}
          />
        </div>
      )}
    </Modal>
  );
};
