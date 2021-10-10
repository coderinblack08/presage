import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
  setDoc,
  doc,
} from "@firebase/firestore";
import { Form, Formik, validateYupSchema, yupToFormErrors } from "formik";
import React from "react";
import { MdAdd } from "react-icons/md";
import * as yup from "yup";
import { Button } from "../../components/button";
import { LocalhostAutoSave } from "../../components/formik/LocalhostAutoSave";
import { InputField, TextareaField } from "../../components/input";
import { Modal, ModalTrigger } from "../../components/modal";
import { isServer } from "../../lib/constants";
import { RewardType } from "../../types";
import { useUser } from "../authentication/useUser";

interface RewardModalProps {}

const defaultValues = {
  name: "",
  description: "",
  points: "",
  type: RewardType.Message,
  message: "",
  link: "",
  maxShoutouts: "",
};

export const RewardModal: React.FC<RewardModalProps> = ({}) => {
  const { uid } = useUser();

  return (
    <Modal
      className="!max-w-xl"
      trigger={
        <ModalTrigger>
          <Button
            className="w-full !rounded-t-none border-t"
            icon={<MdAdd className="w-6 h-6" />}
          >
            <span className="font-semibold">New Reward</span>
          </Button>
        </ModalTrigger>
      }
      title="New Reward"
      description={
        <span>
          Reward your readers for referring your articles. Checkout{" "}
          <a href="#" className="text-gray-900 underline font-semibold">
            this video
          </a>{" "}
          to learn how to setup rewards.
        </span>
      }
    >
      {({ setOpen }) => (
        <Formik
          initialValues={JSON.parse(
            !isServer()
              ? window.localStorage.getItem("autosave-reward") ||
                  JSON.stringify(defaultValues)
              : "{}"
          )}
          validate={async (values) => {
            const schema = yup.object().shape({
              name: yup.string().max(50).required(),
              description: yup.string().min(5).max(200).required(),
              type: yup.mixed<RewardType>().oneOf(Object.values(RewardType)),
              points: yup.number().positive().required(),
              maxShoutouts: yup
                .number()
                .positive()
                [
                  values.type === RewardType.Shoutout
                    ? "required"
                    : "notRequired"
                ](),
              message: yup
                .string()
                .min(5)
                .max(1000)
                [
                  values.type === RewardType.Message
                    ? "required"
                    : "notRequired"
                ](),
            });
            try {
              await validateYupSchema(values, schema);
            } catch (err: any) {
              return yupToFormErrors(err);
            }
            return {};
          }}
          onSubmit={async (values) => {
            try {
              for (const key of Object.keys(values)) {
                if (!values[key]) {
                  delete values[key];
                }
              }
              const data = {
                ...values,
                userId: uid,
                createdAt: serverTimestamp(),
              };
              const { id } = await addDoc(
                collection(getFirestore(), "rewards"),
                data
              );
              if (values.type === RewardType.Message) {
                await setDoc(doc(getFirestore(), "reward_messages", id), {
                  message: values.message,
                  userId: uid,
                });
              }
              window.localStorage.removeItem("autosave-reward");
              setOpen(false);
            } catch {}
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="space-y-3">
              <select
                defaultValue={values.type}
                onChange={(e) => setFieldValue("type", e.target.value)}
                className="form-select rounded-lg border-gray-200 shadow-sm font-medium focus:ring focus:ring-gray-300 focus:border-gray-500/50 w-40"
              >
                <option value={RewardType.Form}>Form</option>
                <option value={RewardType.Message}>Message</option>
                <option value={RewardType.Shoutout}>Shoutout</option>
              </select>
              <InputField
                placeholder="Points"
                type="number"
                min={0}
                name="points"
                outline
              />
              <InputField placeholder="Name" name="name" outline />
              <TextareaField
                placeholder="Description"
                name="description"
                outline
              />
              <div className="py-2">
                <hr />
              </div>
              {({
                [RewardType.Message]: (
                  <TextareaField
                    label="Additional Information"
                    name="message"
                    placeholder="Your message..."
                    outline
                  />
                ),
                [RewardType.Shoutout]: (
                  <InputField
                    label="Max Shoutouts Per Article"
                    name="maxShoutouts"
                    type="number"
                    outline
                  />
                ),
              } as any)[values.type] || (
                <div className="pb-4">
                  <span className="text-gray-500">
                    We&apos;re still building this feature out! Subscribe to our
                    newsletter to be notified when it&apos;s ready.
                  </span>
                </div>
              )}
              <Button
                type="submit"
                loading={isSubmitting}
                color="black"
                className="w-full"
                size="medium"
              >
                Create Reward
              </Button>
              <LocalhostAutoSave storageKey="reward" />
            </Form>
          )}
        </Formik>
      )}
    </Modal>
  );
};
