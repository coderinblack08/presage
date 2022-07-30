import { IconDownload, IconMoon, IconSun, IconUpload } from "@tabler/icons";
import { Field, Form, Formik } from "formik";
import { useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { useKBar } from "kbar";
import isEqual from "lodash.isequal";
import { GetServerSideProps } from "next";
import { useTheme } from "next-themes";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import { MdOpenInNew, MdOutlineMoreHoriz } from "react-icons/md";
import { Button, IconButton, Input, Popover } from "ui";
import { collapseAtom, currentFileAtom } from "../../lib/store";
import { InferQueryOutput, trpc } from "../../lib/trpc";
import { AutoSave } from "../../modules/editor/FormikAutoSave";
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
  const { query } = useKBar();

  useEffect(
    () => setCurrentDraft((prev) => ({ ...prev, draftId: id })),
    [id, setCurrentDraft]
  );

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [collapsed, setCollapsed] = useAtom(collapseAtom);
  const { setTheme, theme } = useTheme();
  const { data: draft, isLoading } = trpc.useQuery(["drafts.byId", { id }]);
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

  if (!mounted) return null;

  return (
    <DashboardLayout>
      <button className="fixed z-50 bg-white dark:bg-gray-900 dark:border-gray-800 bottom-5 right-5 border rounded-xl shadow-lg">
        <div className="divide-x flex items-center text-gray-400 dark:divide-gray-800">
          <button
            className="px-3 py-2 flex items-center"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <span className="font-semibold mr-3 text-[13px]">Theme</span>
            <div className="border dark:border-gray-800 rounded-lg shadow-sm p-1">
              {theme === "dark" ? (
                <IconSun size={12} />
              ) : (
                <IconMoon size={12} />
              )}
            </div>
          </button>
          <button onClick={query.toggle} className="px-3 py-2">
            <span className="font-semibold mr-3 text-[13px]">Actions</span>
            <kbd className="mr-1.5">⌘</kbd>
            <kbd>K</kbd>
          </button>
        </div>
      </button>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          if (!isEqual(values, initialValues) && !isLoading) {
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
                <div className="flex items-center space-x-2">
                  {values.published && (
                    <Button
                      size="sm"
                      variant="ghost"
                      icon={<MdOpenInNew size={18} />}
                    />
                  )}
                  <Popover
                    className="!w-96"
                    trigger={
                      <Button
                        size="sm"
                        variant="ghost"
                        icon={<MdOutlineMoreHoriz size={20} />}
                      />
                    }
                  >
                    <h3 className="font-bold dark:text-white">
                      Update Settings
                    </h3>
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
                      <label className="block text-sm dark:text-white">
                        <input
                          checked={values.private}
                          onClick={() =>
                            setFieldValue("private", !values.private)
                          }
                          className="mr-2 w-5 h-5 focus:ring-offset-0 form-checkbox rounded dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm"
                          type="checkbox"
                        />
                        Private
                      </label>
                      <Button
                        size="sm"
                        variant={theme === "dark" ? "filled" : "light"}
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
              <main className="max-w-[52rem] mx-auto px-8 w-full h-full py-24 lg:py-32">
                <AutoSave />
                <ContentEditable
                  className="text-3xl font-bold text-gray-900 dark:text-white focus:outline-none cursor-text leading-normal"
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
