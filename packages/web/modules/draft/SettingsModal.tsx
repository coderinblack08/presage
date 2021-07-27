import { Form, Formik, yupToFormErrors } from "formik";
import * as yup from "yup";
import React, { useState } from "react";
import { MdSave } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button } from "../../components/Button";
import { InputField } from "../../components/InputField";
import { Modal } from "../../components/Modal";
import { ModalHeader } from "../../components/ModalHeader";
import { mutator } from "../../lib/mutator";
import { Article } from "../../lib/types";

interface SettingsModalProps {
  id: string;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data: draft } = useQuery<Article>(`/articles/draft/${id}`);
  const { mutateAsync } = useMutation(mutator);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        type="button"
        color="transparent"
        size="none"
        noAnimate
      >
        <span>Settings</span>
      </Button>
      <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        <Formik
          initialValues={{
            canonical: draft?.canonical || "",
          }}
          validationSchema={yup.object().shape({
            canonical: yup.string().url().notRequired(),
          })}
          onSubmit={async (values) => {
            await mutateAsync([`/articles/${id}`, values, "patch"], {
              onSuccess: (data) => {
                queryClient.setQueryData<Article>(
                  `/articles/draft/${id}`,
                  (old) => ({ ...old, ...data })
                );
                setIsOpen(false);
              },
            });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <ModalHeader
                handleClose={() => setIsOpen(false)}
                button={
                  <Button
                    size="small"
                    type="submit"
                    loading={isSubmitting}
                    icon={<MdSave className="w-4 h-4" />}
                  >
                    Save
                  </Button>
                }
              />
              <div className="p-6 space-y-3">
                <InputField
                  placeholder="https://example.com/blog"
                  name="canonical"
                  label="Canonical"
                />
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};
