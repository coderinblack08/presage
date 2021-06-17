import { Form, Formik } from "formik";
import { serialize } from "object-to-formdata";
import React, { useState } from "react";
import { useRef } from "react";
import { MdClose, MdFileUpload } from "react-icons/md";
import { useMutation } from "react-query";
import { Button } from "../../components/Button";
import { InputField } from "../../components/InputField";
import { Modal } from "../../components/Modal";
import { mutator } from "../../lib/mutator";

interface UploadModalProps {}

export const UploadModal: React.FC<UploadModalProps> = ({}) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync } = useMutation(mutator);
  const audio = useRef<HTMLInputElement>(null);
  const initialFocus = useRef(null);
  const thumbnail = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button color="gray" onClick={() => setOpen(true)}>
        Upload
      </Button>
      <Modal
        initialFocus={initialFocus}
        isOpen={open}
        closeModal={() => setOpen(false)}
      >
        <Formik
          initialValues={{ title: "", description: "" }}
          onSubmit={async (values) => {
            const body = {
              ...values,
              audio: audio.current?.files ? audio.current?.files[0] : null,
              thumbnail: thumbnail.current?.files
                ? thumbnail.current?.files[0]
                : null,
            };

            try {
              await mutateAsync(["/echo", serialize(body), "post"], {
                onSuccess: () => {
                  setOpen(false);
                },
              });
            } catch (error) {
              console.error(error);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <header className="flex items-center justify-between bg-gray-600 px-6 py-2 border-b border-gray-500">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="focus:outline-none"
                >
                  <MdClose className="text-gray-300 w-5 h-5" />
                </button>
                <Button
                  loading={isSubmitting}
                  type="submit"
                  icon={<MdFileUpload />}
                  size="small"
                >
                  Upload
                </Button>
              </header>
              <div className="p-6">
                <h4>Upload Echo</h4>
                <div className="space-y-4 mt-4">
                  <InputField
                    placeholder="Title"
                    name="title"
                    ref={initialFocus}
                  />
                  <InputField
                    placeholder="Description"
                    name="description"
                    className="h-28"
                    textarea
                  />
                  <div>
                    <label className="block font-bold mb-1" htmlFor="audio">
                      Audio
                    </label>
                    <input
                      ref={audio}
                      accept="audio/*"
                      type="file"
                      name="audio"
                      id="audio"
                      multiple={false}
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1" htmlFor="thumbnail">
                      Thumbnail
                    </label>
                    <input
                      ref={thumbnail}
                      type="file"
                      accept="image/*"
                      name="thumbnail"
                      id="thumbnail"
                      multiple={false}
                    />
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};
