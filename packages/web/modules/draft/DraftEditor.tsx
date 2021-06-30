/* eslint-disable jsx-a11y/alt-text */
import { Form, Formik } from "formik";
import React from "react";
import { Bookmark, Image } from "react-iconly";
import { MdPublish } from "react-icons/md";
import { useMutation, useQuery } from "react-query";
import { Button } from "../../components/Button";
import { mutator } from "../../lib/mutator";
import { Article } from "../../lib/types";
import { AutoSave } from "./AutoSave";
import { TipTapEditor } from "./TipTapEditor";
import { useEditorStore } from "./useEditorStore";

interface DraftEditorProps {}

export const DraftEditor: React.FC<DraftEditorProps> = ({}) => {
  const draftId = useEditorStore((x) => x.draftId);
  const { data: draft, isFetching } = useQuery<Article>(`/articles/${draftId}`);
  const { mutateAsync } = useMutation(mutator);

  if (isFetching || !draft) {
    return <div className="spinner w-auto" />;
  }

  return (
    <Formik
      initialValues={{
        title: draft?.title || "",
        body: draft?.body || null,
      }}
      enableReinitialize
      onSubmit={async (values, { setSubmitting }) => {
        await mutateAsync([`/articles/${draftId}`, values, "patch"]);
        setSubmitting(false);
      }}
    >
      {({ values }) => (
        <Form>
          <header className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Button
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
              </Button>
              <Button
                icon={
                  <div className="scale-80">
                    <Bookmark set="bulk" />
                  </div>
                }
                type="button"
                color="transparent"
                size="none"
              >
                <span className="text-gray-300 font-semibold">Add Tags</span>
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <Button type="button" icon={<MdPublish className="w-5 h-5" />}>
                Publish
              </Button>
            </div>
          </header>
          {values ? <TipTapEditor /> : null}
          <AutoSave />
        </Form>
      )}
    </Formik>
  );
};
