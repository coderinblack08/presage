/* eslint-disable jsx-a11y/alt-text */
import dynamic from "next/dynamic";
import { Form, Formik } from "formik";
import React from "react";
import { MdPublish } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as yup from "yup";
import { Button } from "../../components/Button";
import { mutator } from "../../lib/mutator";
import { Article } from "../../lib/types";
import { AutoSave } from "./AutoSave";
import { DeleteDraftModal } from "./DeleteDraftModal";
import { EditTagModal } from "./EditTagModal";
const TipTapEditor = dynamic(() => import("./TipTapEditor"), { ssr: false });

interface DraftEditorProps {
  id: string;
}

export const DraftEditor: React.FC<DraftEditorProps> = ({ id }) => {
  const { data: draft, isFetching } = useQuery<Article>(
    `/articles/draft/${id}`
  );
  const { mutateAsync } = useMutation(mutator);
  const queryClient = useQueryClient();

  if (isFetching || !draft) {
    return <div className="spinner w-auto" />;
  }

  async function updatePublishedCache(published: boolean) {
    queryClient.setQueryData<Article>(
      `/articles/draft/${id}`,
      (old) => ({ ...old, published } as any)
    );
    queryClient.setQueryData<Article[]>(`/articles/drafts`, (old) => {
      if (old) {
        const idx = old?.findIndex((v) => v.id === id);
        old[idx] = { ...old[idx], published };
        return old;
      }
      return [];
    });
  }

  return (
    <Formik
      initialValues={{
        title: draft?.title || "",
        body: draft?.body || null,
      }}
      validationSchema={yup.object().shape({
        title: yup.string().max(100).required(),
        body: yup.string().nullable(),
      })}
      enableReinitialize
      onSubmit={async (values, { setSubmitting }) => {
        await mutateAsync([`/articles/${id}`, values, "patch"], {
          onSuccess: () => {
            queryClient.setQueryData<Article>(
              `/articles/draft/${id}`,
              (old) => {
                return {
                  ...old,
                  ...values,
                } as Article;
              }
            );
            queryClient.setQueryData<Article[]>(`/articles/drafts`, (old) => {
              if (old) {
                const idx = old?.findIndex((v) => v.id === id);
                old[idx] = { ...old[idx], title: values.title };
                return old;
              }
              return [];
            });
          },
        });
        console.log("Draft auto-saved");
        setSubmitting(false);
      }}
    >
      {({ values, isValid }) => (
        <Form>
          <header className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              {/* <Button
                icon={
                  <div className="scale-80">
                    <Image set="bulk" />
                  </div>
                }
                color="transparent"
                size="none"
                type="button"
              >
                <span className="text-gray-300 font-semibold">
                  Upload Cover
                </span>
              </Button> */}
              <EditTagModal id={id} />
              <DeleteDraftModal id={id} />
            </div>
            <div className="flex items-center space-x-4">
              {draft.published ? (
                <Button
                  type="button"
                  onClick={async () => {
                    if (isValid) {
                      await mutateAsync(
                        [`/articles/unpublish/${id}`, null, "post"],
                        {
                          onSuccess: () => updatePublishedCache(false),
                        }
                      );
                    }
                  }}
                >
                  Unpublish
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={async () => {
                    if (isValid) {
                      await mutateAsync(
                        [`/articles/publish/${id}`, null, "post"],
                        {
                          onSuccess: () => updatePublishedCache(true),
                        }
                      );
                    }
                  }}
                  icon={<MdPublish className="w-5 h-5" />}
                >
                  Publish
                </Button>
              )}
            </div>
          </header>
          {values ? <TipTapEditor /> : null}
          <AutoSave />
        </Form>
      )}
    </Formik>
  );
};
