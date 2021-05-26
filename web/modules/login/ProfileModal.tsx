import { Dialog } from "@headlessui/react";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import create from "zustand";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { InputField } from "../../formik/InputField";
import { profileSchema } from "./ProfileSchema";
import { useAuthState } from "react-firebase-hooks/auth";

interface ProfileModalProps {}

export const useProfileModalStore = create((set) => ({
  open: false,
  defaultValues: {},
  setDefaultValues: (values: any) => set({ defaultValues: values }),
  setOpen: (open: boolean) => set({ open }),
}));

export const ProfileModal: React.FC<ProfileModalProps> = () => {
  const [open, setOpen, defaultValues] = useProfileModalStore((x: any) => [
    x.open,
    x.setOpen,
    x.defaultValues,
  ]);
  const auth = firebase.auth();
  const [user] = useAuthState(auth);

  // useEffect(() => setOpen(true), []);

  return (
    <Modal open={open} className="py-8 max-w-xl">
      <Dialog.Title as="h4" className="text-xl font-bold">
        Setup Profile
      </Dialog.Title>
      <Formik
        initialValues={{
          username: "",
          displayName: defaultValues.displayName || "",
          bio: "",
        }}
        onSubmit={async (values) => {
          await firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .set({
              uid: user.uid,
              ...values,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
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
