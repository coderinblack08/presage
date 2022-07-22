import {
  IconChevronsLeft,
  IconMenu2,
  IconPackage,
  IconStackPop,
} from "@tabler/icons";
import { Form, Formik } from "formik";
import { useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import isEqual from "lodash.isequal";
import { GetServerSideProps } from "next";
import React, { useEffect, useRef } from "react";
import ContentEditable from "react-contenteditable";
import { Button, Input, Popover } from "ui";
import { AutoSave } from "../../editor/elements/FormikAutoSave";
import { collapseAtom, currentFileAtom } from "../../lib/store";
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

  const [collapsed, setCollapsed] = useAtom(collapseAtom);
  const { data: draft } = trpc.useQuery(["drafts.byId", { id }]);
  const draftTitleRef = useRef<HTMLElement>(null);
  const breadcrumbs = [
    ...currentDraft.stringPath,
    draft?.title || "Untitled",
  ].filter(Boolean);
  const utils = trpc.useContext();

  return (
    <DashboardLayout>
      <Formik
        initialValues={{
          title: draft?.title || "",
          content: draft?.content as any,
        }}
        onSubmit={(values) => {
          if (
            !isEqual(values, {
              title: draft?.title,
              content: draft?.content,
            })
          ) {
            updateDraft.mutate(
              { ...values, id },
              {
                onSuccess(data) {
                  utils.setQueryData(["drafts.byId", { id }], data);
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
              {draft?.published && (
                <div className="shadow-inner text-gray-500">
                  <div className="flex items-center justify-center px-5 py-3">
                    <IconPackage size={20} className="mr-2" />
                    <span className="mr-4">
                      This article has been published (click to view)
                    </span>
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between p-3 border-y gap-4">
                <div className="flex items-center text-gray-500">
                  <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="mr-3 p-1 text-gray-400 border shadow-sm rounded-lg"
                  >
                    {collapsed ? (
                      <IconMenu2 size={20} />
                    ) : (
                      <IconChevronsLeft size={20} />
                    )}
                  </button>
                  {breadcrumbs.map((folder, index) => {
                    const isLast = index === breadcrumbs.length - 1;
                    return (
                      <React.Fragment key={index}>
                        <span className={`rounded-lg truncate px-1`}>
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
                  <Popover
                    trigger={
                      <Button size="sm" variant="outline">
                        Settings
                      </Button>
                    }
                    className="!w-96"
                  >
                    <h3 className="text-lg font-bold">Update Settings</h3>
                    <div className="flex flex-col gap-2 mt-2">
                      <Input name="name" placeholder="Name" />
                      <Input
                        name="description"
                        placeholder="Description"
                        textarea
                      />
                      <Input
                        name="canonical"
                        placeholder="Canonical URL"
                        type="url"
                      />
                      <label className="block">
                        <input
                          className="mr-2 w-5 h-5 form-checkbox rounded border-gray-200 shadow-sm"
                          type="checkbox"
                        />
                        Public
                      </label>
                      <Button className="w-full mt-2" color="blue">
                        Save Settings
                      </Button>
                    </div>
                  </Popover>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<IconStackPop size={24} />}
                  >
                    Publish
                  </Button>
                </div>
              </div>
              <main className="max-w-3xl mx-auto px-8 w-full h-full py-16 lg:py-24">
                <AutoSave />
                <ContentEditable
                  className="text-3xl font-bold text-gray-900 focus:outline-none cursor-text"
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
