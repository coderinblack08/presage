import { Modal } from "@presage/ui";
import React from "react";
import { MutateJournalForm } from "./MutateJournalForm";

interface CreateJournalModalModalProps {}

export const CreateJournalModal: React.FC<CreateJournalModalModalProps> = ({}) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Modal visible={visible} onCancel={() => setVisible(false)}>
        {() => (
          <div>
            <h1 className="text-xl font-bold">Update Journal</h1>
            <MutateJournalForm close={close} action={async (values) => {}} />
          </div>
        )}
      </Modal>
    </>
  );
};
