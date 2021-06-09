import { Transition, Dialog } from "@headlessui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { MdClose } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button } from "../../components/Button";
import { InputField } from "../../components/InputField";
import { mutator } from "../../lib/mutator";
import { User } from "../../types";

interface EditModalProps {}

export const EditModal: React.FC<EditModalProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: me } = useQuery<User>("/api/me");
  const { mutateAsync } = useMutation(mutator);
  const queryClient = useQueryClient();
  const router = useRouter();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Button color="gray" className="mt-4" onClick={openModal}>
        Edit Profile
      </Button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-75 backdrop-filter backdrop-blur-lg transition-opacity" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-lg overflow-hidden text-left align-middle transition-all transform bg-gray-900 border border-gray-800 rounded-xl">
                <Formik
                  initialValues={{
                    username: me?.username || "",
                    displayName: me?.displayName || "",
                    bio: me?.bio || "",
                  }}
                  onSubmit={async (values) => {
                    await mutateAsync(["/api/auth", values, "patch"], {
                      onSuccess: () => {
                        closeModal();
                        queryClient.clear();
                        router.push(
                          "/user/[username]",
                          `/user/${values.username}`
                        );
                      },
                    });
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <header className="flex items-center justify-between bg-gray-800 border-b border-gray-700 py-2 px-6">
                        <button
                          type="button"
                          className="focus:outline-none"
                          onClick={closeModal}
                        >
                          <MdClose className="w-5 h-5 text-gray-300" />
                        </button>
                        <Button loading={isSubmitting} type="submit" size="sm">
                          Save Changes
                        </Button>
                      </header>
                      <main className="p-6">
                        <Dialog.Title as="h4">Edit Profile</Dialog.Title>
                        <div className="mt-4 space-y-4">
                          <InputField
                            name="displayName"
                            placeholder="Display Name"
                          />
                          <InputField name="username" placeholder="Username" />
                          <InputField
                            name="bio"
                            placeholder="Biography"
                            className="h-28"
                            textarea
                          />
                        </div>
                      </main>
                    </Form>
                  )}
                </Formik>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
