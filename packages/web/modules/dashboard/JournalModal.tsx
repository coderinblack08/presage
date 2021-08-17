import { AddOutlined } from "@material-ui/icons";
import React from "react";
import { Button } from "../../components/button";
import { Input, Textarea } from "../../components/input";
import { Modal, ModalTrigger } from "../../components/modal/Modal";

interface JournalModalProps {}

export const JournalModal: React.FC<JournalModalProps> = ({}) => {
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
            <span className="text-sm font-semibold text-gray-500">New</span>
          </Button>
        </ModalTrigger>
      }
      title="New Journal"
      description="Organize your drafts with journals"
    >
      <form action="" className="space-y-3">
        <Input placeholder="Name" name="name" outline />
        <Textarea placeholder="Description" name="description" outline />
        <Button color="black" className="w-full" size="medium">
          Create Journal
        </Button>
      </form>
    </Modal>
  );
};
