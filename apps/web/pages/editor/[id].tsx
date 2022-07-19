import { IconFile, IconStackPop } from "@tabler/icons";
import { Form, Formik } from "formik";
import { useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { GetServerSideProps } from "next";
import React, { useEffect, useRef } from "react";
import ContentEditable from "react-contenteditable";
import { Button, ThemeIcon } from "ui";
import { RichTextEditor } from "../../editor/RichTextEditor";
import { currentFileAtom } from "../../lib/store";
import { trpc } from "../../lib/trpc";
import { DashboardLayout } from "../../modules/layout/DashboardLayout";

interface EditorPageProps {
  id: string;
}

const EditorPage: React.FC<EditorPageProps> = ({ id }) => {
  useHydrateAtoms([
    [currentFileAtom, { draftId: id, absolutePath: [], stringPath: [] }],
  ] as const);
  const [currentDraft, setCurrentDraft] = useAtom(currentFileAtom);

  useEffect(
    () => setCurrentDraft((prev) => ({ ...prev, draftId: id })),
    [id, setCurrentDraft]
  );

  const { data: draft } = trpc.useQuery(["drafts.byId", { id }]);
  const draftTitleRef = useRef<HTMLElement>(null);

  return (
    <DashboardLayout>
      <Formik
        initialValues={{ title: draft?.title || "", content: null }}
        onSubmit={(values) => {}}
        enableReinitialize
      >
        {({ values, setFieldValue }) => (
          <Form className="flex flex-col h-full">
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center text-gray-500">
                <ThemeIcon className="mr-2">
                  <IconFile size={21} />
                </ThemeIcon>
                {[...currentDraft.stringPath, draft?.title].map(
                  (folder, index) => {
                    const isLast = index === currentDraft.stringPath.length;
                    return (
                      <>
                        {isLast ? (
                          <ContentEditable
                            key={index}
                            className={`rounded-lg px-2 transition cursor-text bg-blue-100/50 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-offset-white`}
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
                        ) : (
                          <span key={index} className={`rounded-lg px-1`}>
                            {folder}
                          </span>
                        )}
                        {!isLast && (
                          <span className="mx-1.5 text-gray-300 text-lg font-semibold">
                            /
                          </span>
                        )}
                      </>
                    );
                  }
                )}
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
            <main className="max-w-3xl mx-auto px-5 py-5 lg:py-12 w-full h-full">
              <RichTextEditor />
            </main>
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
