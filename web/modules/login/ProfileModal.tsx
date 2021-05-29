import { Dialog } from "@headlessui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { InputField } from "../../formik/InputField";
import { profileSchema } from "./ProfileSchema";

interface ProfileModalProps {}

export const ProfileModal: React.FC<ProfileModalProps> = () => {
  const [open, setOpen] = useState(false);

  return (
    <Modal open={open} className="py-8 max-w-xl">
      <Dialog.Title as="h4" className="text-xl font-bold">
        Setup Profile
      </Dialog.Title>
      <Formik
        initialValues={{
          username: "",
          displayName: "",
          bio: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          try {
            setOpen(false);
          } catch (error) {
            setErrors({ username: "Username is taken " });
          }
        }}
        validationSchema={profileSchema}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className="grid grid-cols-9 gap-4 mt-6">
            <div className="col-span-5">
              <InputField name="username" placeholder="Username" />
            </div>
            <div className="col-span-4">
              <InputField name="displayName" placeholder="Display Name" />
            </div>
            <div className="col-span-9">
              <InputField name="bio" placeholder="Biography" textarea />
            </div>
            <Button
              type="submit"
              className="w-full col-span-9"
              disabled={isSubmitting}
            >
              Create your account
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
