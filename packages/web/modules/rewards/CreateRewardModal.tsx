import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import * as yup from "yup";
import { Button } from "../../components/Button";
import { InputField } from "../../components/InputField";
import { Modal } from "../../components/Modal";
import { ModalHeader } from "../../components/ModalHeader";
import { Select } from "../../components/Select";
import { mutator } from "../../lib/mutator";
import { Reward } from "../../lib/types";

interface CreateRewardModalProps {}

export const CreateRewardModal: React.FC<CreateRewardModalProps> = ({}) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync } = useMutation(mutator);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Create</Button>
      <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        <Formik
          initialValues={{
            name: "",
            description: "",
            type: "other",
            points: "",
            link: "",
          }}
          validationSchema={yup.object().shape({
            name: yup.string().max(20).min(5).required(),
            description: yup.string().max(100).min(10).required(),
            link: yup
              .string()
              .url("link must be a valid url, don't forget http!")
              .nullable(),
            type: yup
              .string()
              .oneOf(["shoutout", "link", "other"])
              .default("other")
              .required(),
            points: yup
              .number()
              .typeError("points must be a number")
              .min(0)
              .max(1000)
              .required(),
          })}
          onSubmit={async (values) => {
            await mutateAsync(["/rewards", values, "post"], {
              onSuccess: (data) => {
                queryClient.setQueryData<Reward[]>("/rewards", (old) =>
                  old ? [data, ...old] : [data]
                );
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
                    Create
                  </Button>
                }
                handleClose={() => setIsOpen(false)}
              />
              <div className="p-6">
                <div className="space-y-3">
                  <h4>New Reward</h4>
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
