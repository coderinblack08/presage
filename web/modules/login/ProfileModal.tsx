import { Dialog } from "@headlessui/react";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { InputField } from "../../formik/InputField";
import { supabase } from "../../lib/supabase";
import { useUser } from "../../stores/auth";
import { definitions } from "../../types/supabase";
import { profileSchema } from "./ProfileSchema";

interface ProfileModalProps {}

export const ProfileModal: React.FC<ProfileModalProps> = () => {
  const [show, setShow] = useState(false);
  const { user, profile, loading, refresh } = useUser();

  useEffect(() => {
    if (
      user &&
      profile &&
      !loading &&
      (!profile.displayName || !profile.username)
    ) {
      setShow(true);
    }
  }, [user, profile]);

  return (
    <Modal open={show} className="py-10 max-w-xl">
      <Dialog.Title as="h4" className="text-xl font-bold">
        Setup Profile
      </Dialog.Title>
      <Formik
        initialValues={{ username: "", displayName: "", bio: "" }}
        onSubmit={async (values) => {
          const { error } = await supabase
            .from<definitions["profiles"]>("profiles")
            .update(values)
            .match({ id: user.id });

          if (error) {
            console.error(error);
          } else {
            refresh();
            setShow(false);
          }
        }}
        validationSchema={profileSchema}
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
