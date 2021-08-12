import { Formik, Form } from "formik";
import React from "react";
import { Button } from "../../components/Button";
import { InputField } from "../../components/InputField";
import { Modal } from "../../components/Modal";
import { ModalHeader } from "../../components/ModalHeader";
import { Select } from "../../components/Select";
import { ModalProps, Reward } from "../../lib/types";
import { rewardSchema } from "./schema";

interface MutateRewardModalProps extends ModalProps {
  reward?: Reward;
  onSubmit: (values: any) => Promise<void | any>;
}

export const MutateRewardModal: React.FC<MutateRewardModalProps> = ({
  onSubmit,
  reward,
  isOpen,
  closeModal,
}) => {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Formik
        initialValues={{
          name: reward?.name || "",
          description: reward?.description || "",
          type: reward?.type || "shoutout",
          points: reward?.points || "",
          link: reward?.link || "",
        }}
        validationSchema={rewardSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <ModalHeader
              handleClose={closeModal}
              button={
                <Button loading={isSubmitting} type="submit" size="small">
                  {reward ? "Update" : "Create"}
                </Button>
              }
            />
            <div className="p-6">
              <div className="space-y-3">
                <h4>{reward ? "Update" : "Create"} Reward</h4>
                <div className="grid grid-cols-[3fr,2fr] items-start space-x-3">
                  <InputField
                    placeholder="Name"
                    name="name"
                    className="col-span-2"
                  />
                  <Select
                    value={values.type}
                    onChange={(e) =>
                      setFieldValue("type", e.target.value, true)
                    }
                  >
                    <option value="sho0utout">Shoutout</option>
                    <option value="link">URL</option>
                  </Select>
                </div>
                <InputField
                  placeholder="Points"
                  name="points"
                  className="col-span-2"
                />
                {values.type === "link" ? (
                  <InputField placeholder="Link" name="link" />
                ) : null}
                <InputField
                  placeholder="Description"
                  name="description"
                  className="h-24"
                  textarea
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
