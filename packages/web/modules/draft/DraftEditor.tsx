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

  return (
    <Formik
      initialValues={{
        title: draft?.title || "",
        body: draft?.bodyJson || null,
      }}
      validationSchema={yup.object().shape({
        title: yup.string().max(100).required(),
        body: yup.object().nullable(),
      })}
      enableReinitialize
      onSubmit={async ({ title, body }, { setSubmitting }) => {
        const requestBody: Partial<Article> = {};
        if (title !== draft.title) requestBody.title = title;
        if (!isEqual(body, draft.bodyJson)) requestBody.body = body;

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
              `/articles/drafts?journalId=${draft.journalId}`,
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
        <Form className="max-w-3xl mx-auto py-0 md:py-4 lg:py-8 xl:py-12">
          {values ? <TipTapEditor /> : null}
          <AutoSave />
        </Form>
      )}
    </Formik>
  );
};
