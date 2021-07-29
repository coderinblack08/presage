import { Form, Formik } from "formik";
import React, { useState } from "react";
import { TicketStar } from "react-iconly";
import { useMutation, useQueryClient } from "react-query";
import * as yup from "yup";
import { Button } from "../../components/Button";
import { InputField } from "../../components/InputField";
import { Modal } from "../../components/Modal";
import { ModalHeader } from "../../components/ModalHeader";
import { Select } from "../../components/Select";
import { mutator } from "../../lib/mutator";
import { Reward } from "../../lib/types";
import { rewardSchema } from "./schema";

interface UpdateRewardModalProps {
  reward: Reward;
}

export const UpdateRewardModal: React.FC<UpdateRewardModalProps> = ({
  reward,
}) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync } = useMutation(mutator);

  return (
    <>
      <button
        className="w-full flex items-center justify-between focus:outline-none"
        onClick={() => setIsOpen(true)}
      >
        <h6 className="font-semibold text-gray-600 text-left">{reward.name}</h6>
        <p className="font-bold text-gray-800 text-right">
          {reward.points} {reward.points === 1 ? "Point" : "Points"}
        </p>
      </button>
      <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        <Formik
          initialValues={{
            name: reward.name || "",
            description: reward.description || "",
            type: reward.type || "other",
            points: reward.points || "",
            link: reward.link || "",
          }}
          validationSchema={rewardSchema}
          onSubmit={async (values) => {
            await mutateAsync([`/rewards/${reward.id}`, values, "patch"], {
              onSuccess: () => {
                queryClient.refetchQueries("/rewards");
                setIsOpen(false);
              },
            });
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form>
              <ModalHeader
                button={
                  <Button loading={isSubmitting} type="submit" size="small">
                    Update
                  </Button>
                }
                handleClose={() => setIsOpen(false)}
              />
              <div className="p-6">
                <div className="space-y-3">
                  <h4>Update {values.name}</h4>
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
                      <option value="other">Other</option>
                      <option value="shoutout">Shoutout</option>
                      <option value="link">Private Link</option>
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
    </>
  );
};
