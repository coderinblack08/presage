import { IconDownload, IconUpload } from "@tabler/icons";
import { Field, Form, Formik } from "formik";
import { useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import isEqual from "lodash.isequal";
import { GetServerSideProps } from "next";
import React, { useEffect, useMemo, useRef } from "react";
import ContentEditable from "react-contenteditable";
import { MdCheck, MdOutlineMoreHoriz } from "react-icons/md";
import { Button, Input, Menu, MenuDivider, MenuItem, Popover } from "ui";
import { AutoSave } from "../../editor/elements/FormikAutoSave";
import { collapseAtom, currentFileAtom } from "../../lib/store";
import { InferQueryOutput, trpc } from "../../lib/trpc";
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

  const [collapsed, setCollapsed] = useAtom(collapseAtom);
  const { data: draft } = trpc.useQuery(["drafts.byId", { id }]);
  const draftTitleRef = useRef<HTMLElement>(null);
  const breadcrumbs = [
    ...currentDraft.stringPath,
    draft?.title || "Untitled",
  ].filter(Boolean);
  const utils = trpc.useContext();
  const initialValues = useMemo(() => {
    return {
      title: draft?.title || "",
      content: draft?.content as any,
      description: draft?.description || "",
      canonicalUrl: draft?.canonicalUrl || "",
      published: draft?.published || false,
      private: draft?.private || false,
    };
  }, [draft]);

  return (
    <DashboardLayout>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          if (!isEqual(values, initialValues)) {
            updateDraft.mutate(
              { id, ...values },
              {
                onSuccess(data) {
                  if (data.title !== draft?.title) {
                    utils.setQueryData(["drafts.recursive"], ((
                      old: InferQueryOutput<"drafts.recursive">
                    ) => {
                      if (old) {
                        const dfs = (node: any) => {
                          for (let i = 0; i < node.drafts.length; i++) {
                            if (node.drafts[i].id === id) {
                              node.drafts[i] = {
                                ...node.drafts[i],
                                title: data.title,
                              };
                              return;
                            }
                          }
                          for (const child of node.children || []) {
                            dfs(child);
                          }
                        };
                        dfs(old);
                        return old;
                      }
                    }) as any);
                    utils.setQueryData(["drafts.byId", { id }], data);
                  }
                  // toast.success("Saved successfully", {
                  //   duration: 1000,
                  //   position: "bottom-right",
                  // });
                },
              }
            );
          }
        }}
        enableReinitialize
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="flex flex-col h-full">
              <div className="absolute right-0 top-0 flex items-center justify-between p-3 gap-4">
                <div className="flex items-center">
                  <Popover
                    className="!w-96"
                    trigger={
                      <button className="p-1 rounded-lg hover:bg-gray-100 text-gray-400">
                        <MdOutlineMoreHoriz size={18} />
                      </button>
                    }
                  >
                    <h3 className="font-bold">Update Settings</h3>
                    <div className="flex flex-col gap-4 mt-2">
                      <Field
                        as={Input}
                        name="description"
                        placeholder="Description"
                        size="sm"
                        textarea
                      />
                      <Field
                        as={Input}
                        name="canonicalUrl"
                        placeholder="Canonical URL"
                        size="sm"
                        type="url"
                      />
                      <label className="block text-sm">
                        <input
                          checked={values.private}
                          onClick={() =>
                            setFieldValue("private", !values.private)
                          }
                          className="mr-2 w-5 h-5 form-checkbox rounded border-gray-200 shadow-sm"
                          type="checkbox"
                        />
                        Private
                      </label>
                      <Button
                        size="sm"
                        icon={
                          values.published ? (
                            <IconDownload size={16} />
                          ) : (
                            <IconUpload size={16} />
                          )
                        }
                        onClick={() => {
                          setFieldValue("published", !values.published, true);
                        }}
                      >
                        {values.published ? "Unpublish" : "Publish"}
                      </Button>
                    </div>
                  </Popover>
                </div>
              </div>
              <main className="max-w-3xl mx-auto px-8 w-full h-full py-24 lg:py-32">
                <AutoSave />
                <ContentEditable
                  className="text-3xl font-bold text-gray-900 focus:outline-none cursor-text leading-normal"
                  placeholder="Untitled"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      return false;
                    }
                  }}
                  onPaste={(e) => {
                    // return only text content
                    e.preventDefault();
                    const text = e.clipboardData.getData("text/plain");
                    document.execCommand("insertHTML", false, text);
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
                <RichTextEditor draft={draft} />
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
