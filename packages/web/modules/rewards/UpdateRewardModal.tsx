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
        key={reward.id}
        onClick={() => setIsOpen(true)}
        className="flex flex-col justify-between text-left bg-white rounded-lg p-6 shadow"
      >
        <div>
          <h4>{reward.name}</h4>
          <p className="text-gray-500">{reward.description}</p>
        </div>
        <div className="flex items-center space-x-2 mt-6">
          <div className="flex items-center text-gray-600">
            <TicketStar set="bulk" />
            <p className="ml-2">
              <span className="font-bold">{reward.points}</span> Points
            </p>
          </div>
          <span className="text-gray-600">·</span>
          <p className="text-gray-600">Claimed {reward.claimed} times</p>
        </div>
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
