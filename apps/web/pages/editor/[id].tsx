import { IconFile, IconStackPop } from "@tabler/icons";
import { Form, Formik } from "formik";
import { useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { GetServerSideProps } from "next";
import React, { useEffect, useRef } from "react";
import ContentEditable from "react-contenteditable";
import { Button, ThemeIcon } from "ui";
import { AutoSave } from "../../editor/elements/FormikAutoSave";
import { currentFileAtom } from "../../lib/store";
import { trpc } from "../../lib/trpc";
import { RichTextEditor } from "../../modules/editor/RichTextEditor";
import { DashboardLayout } from "../../modules/layout/DashboardLayout";

interface EditorPageProps {
  id: string;
}

const EditorPage: React.FC<EditorPageProps> = ({ id }) => {
  useHydrateAtoms([
    [currentFileAtom, { draftId: id, absolutePath: [], stringPath: [] }],
  ] as const);

  const [currentDraft, setCurrentDraft] = useAtom(currentFileAtom);
  const updateDraft = trpc.useMutation(["drafts.update"]);

  useEffect(
    () => setCurrentDraft((prev) => ({ ...prev, draftId: id })),
    [id, setCurrentDraft]
  );

  const { data: draft } = trpc.useQuery(["drafts.byId", { id }]);
  const draftTitleRef = useRef<HTMLElement>(null);
  const breadcrumbs = [...currentDraft.stringPath, draft?.title].filter(
    Boolean
  );

  return (
    <DashboardLayout>
      <Formik
        initialValues={{ title: draft?.title || "", content: null as any }}
        onSubmit={(values) => {
          if (!values.content) delete values.content;
          updateDraft.mutate({ ...values, id });
        }}
        enableReinitialize
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-3 border-b">
                <div className="flex items-center text-gray-500">
                  <ThemeIcon className="mr-2">
                    <IconFile size={21} />
                  </ThemeIcon>
                  {breadcrumbs.map((folder, index) => {
                    const isLast = index === breadcrumbs.length - 1;
                    return (
                      <React.Fragment key={index}>
                        <span
                          className={`rounded-lg ${
                            isLast ? "bg-blue-100/50 px-2" : "px-1"
                          }`}
                        >
                          {folder}
                        </span>
                        {!isLast && (
                          <span className="mx-1.5 text-gray-300 text-lg font-semibold">
                            /
                          </span>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    Settings
                  </Button>
                  <Button size="sm" icon={<IconStackPop size={24} />}>
                    Publish
                  </Button>
                </div>
              </div>
              <main className="max-w-3xl mx-auto px-5 w-full h-full py-5 md:py-12 lg:py-24">
                <AutoSave />
                <ContentEditable
                  className="text-3xl font-bold text-gray-900 focus:outline-none"
                  placeholder="Untitled"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      return false;
                    }
                  }}
                  onPaste={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                  innerRef={draftTitleRef}
                  disabled={false}
                  html={values.title}
                  onChange={() => {
                    setFieldValue(
                      "title",
                      draftTitleRef.current?.innerText || ""
                    );
                  }}
                  tagName="h1"
                />
                <RichTextEditor />
              </main>
            </div>
          </Form>
        )}
      </Formik>
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: { id: context.query.id },
  };
};

export default EditorPage;
