import { Form, Formik } from "formik";
import { isEqual } from "lodash";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as yup from "yup";
import { mutator } from "../../lib/mutator";
import { Article } from "../../lib/types";
import { AutoSave } from "./AutoSave";
import TipTapEditor from "./TipTapEditor";
import { useEditorStore } from "./useEditorStore";
// const TipTapEditor = dynamic(() => import("./TipTapEditor"), { ssr: false });

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
      onSubmit={async ({ title, body }, { setSubmitting }) => {
        const { bodyJson } = useEditorStore.getState();
        const requestBody: Partial<Article> = {};
        if (title !== draft.title) requestBody.title = title;
        if (!isEqual(body, draft.body)) requestBody.body = body;
        if (!isEqual(bodyJson, draft.bodyJson)) requestBody.bodyJson = bodyJson;

        await mutateAsync([`/articles/${id}`, requestBody, "patch"], {
          onSuccess: () => {
            queryClient.setQueryData<Article>(
              `/articles/draft/${id}`,
              (old) => {
                return {
                  ...old,
                  ...requestBody,
                } as Article;
              }
            );
            queryClient.setQueryData<Article[]>(
              `/articles/drafts?journalId=${draft.journalId}&published=${draft.published}`,
              (old) => {
                if (old) {
                  const idx = old?.findIndex((v) => v.id === id);
                  old[idx] = {
                    ...old[idx],
                    title,
                  };
                  return old;
                }
                return [];
              }
            );
          },
        });
        console.log("Draft auto-saved");
        setSubmitting(false);
      }}
    >
      {({ values }) => (
        <Form className="max-w-5xl mx-auto">
          {values ? <TipTapEditor /> : null}
          <AutoSave />
        </Form>
      )}
    </Formik>
  );
};
