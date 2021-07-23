import { Field, Form, Formik } from "formik";
import { values } from "lodash";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { Button } from "../../components/Button";
import { InputField } from "../../components/InputField";
import { Modal } from "../../components/Modal";
import { ModalHeader } from "../../components/ModalHeader";
import { mutator } from "../../lib/mutator";
import { User } from "../../lib/types";

interface EditProfileModalProps {
  user: User;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ user }) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync } = useMutation(mutator);
  const router = useRouter();

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        size="small"
        icon={<MdEdit className="w-5 h-5" />}
        rounded
      >
        Edit Profile
      </Button>
      <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        <Formik
          initialValues={{
            username: "" || user.username,
            displayName: "" || user.displayName,
            bio: "" || user.bio,
            profilePicture: "" || user.profilePicture,
          }}
          onSubmit={async (values) => {
            await mutateAsync([`/user`, values, "patch"], {
              onSuccess: (user) => {
                queryClient.setQueryData<User>("/me", user);
                router.push(`/u/${user.username}`);
                setIsOpen(false);
              },
            });
          }}
        >
          {({ isSubmitting, setFieldValue, values }) => (
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
                  <h4>Edit Profile</h4>
                  <div className="flex items-center space-x-5 pb-3">
                    {values.profilePicture && (
                      <img
                        className="w-16 h-16 rounded-full object-cover object-center"
                        src={values.profilePicture}
                        alt="avatar"
                      />
                    )}
                    <input
                      name="avatar"
                      type="file"
                      accept="image/*"
                      multiple={false}
                      onChange={(e) => {
                        if (e.target.files) {
                          const url = URL.createObjectURL(e.target.files[0]);
                          setFieldValue("profilePicture", url);
                        }
                      }}
                    />
                  </div>
                  <InputField placeholder="Username" name="username" />
                  <InputField placeholder="Display Name" name="displayName" />
                  <InputField
                    placeholder="Bio"
                    name="bio"
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
