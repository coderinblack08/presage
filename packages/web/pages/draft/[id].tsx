import { IconLink } from "@tabler/icons";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { useMemo } from "react";
import { HiTag, HiUserCircle } from "react-icons/hi";
import { Button } from "../../components/button";
import {
  useFindArticleQuery,
  useUpdateArticleMutation,
} from "../../generated/graphql";
import { createUrqlClient } from "../../lib/createUrqlClient";
import { Layout } from "../../modules/dashboard/Layout";
import AutoSave from "../../modules/editor/AutoSave";
import { Publish } from "../../modules/editor/Publish";
import { SettingsPanel } from "../../modules/editor/settings/SettingsPanel";
import { SettingsSidebar } from "../../modules/editor/settings/SettingsSidebar";
import { TipTapEditor } from "../../modules/editor/TipTapEditor";
import { TitleInput } from "../../modules/editor/TitleInput";

const DraftPage: NextPage = () => {
  const {
    query: { id },
    push,
  } = useRouter();
  const draftId = useMemo(() => id?.toString() || "", [id]);
  const [{ data: draft }] = useFindArticleQuery({
    variables: { id: draftId },
  });
  const [diff, setDiff] = useState<any | null>(null);
  const [, updateArticle] = useUpdateArticleMutation();

  return (
    <Layout>
      <Formik
        initialValues={{
          title: draft?.findArticle?.title || "",
          editorJSON: draft?.findArticle?.editorJSON || "",
          canonical: draft?.findArticle?.canonical || "",
          description: draft?.findArticle?.description || "",
          tags: draft?.findArticle?.tags.join(", ") || "",
        }}
        onSubmit={async (values, { setFieldError }) => {
          try {
            const data = { ...diff };
            console.log(data);

            if (
              "tags" in diff &&
              (diff.tags !== null || diff.tags !== undefined)
            ) {
              const tags = diff.tags.trim();
              const tagRegex = /(^$)|(^[\w\s\-]+(,\s*[\w\s\-]+)*$)/g;
              const areTags = tagRegex.test(tags);
              if (areTags) {
                data.tags = diff.tags.split(",").map((x: string) => x.trim());
              }
              console.log(diff.tags, values.tags);

              if (tags === "") {
                data.tags = [];
              }

              if (data.tags.length > 5) {
                return setFieldError("tags", "Too many tags");
              }
            }

            await updateArticle({
              articleId: draftId,
              data,
            });
          } catch {}
        }}
        enableReinitialize
      >
        {() => (
          <Form className="flex justify-between h-full w-full">
            <div className="w-full h-full">
              <div className="max-w-4xl w-full mx-auto px-0 sm:px-6 md:px-14 py-7 overflow-y-auto h-full">
                <header className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 max-w-sm">
                    <span className="text-gray-900 font-bold max-w-[10rem] flex-shrink-0 overflow-auto whitespace-nowrap">
                      {draft?.findArticle?.journal.name}
                    </span>
                    <span className="text-gray-300 font-bold">/</span>
                    <span className="text-gray-500 min-w-0 truncate">
                      {draft?.findArticle?.title}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      type="button"
                      icon={<IconLink size={20} />}
                      size="small"
                      onClick={() => push(`/article/${draft?.findArticle!.id}`)}
                      disabled={!draft?.findArticle?.isPublished}
                      outline
                    />
                    <div className="block xl:hidden">
                      <SettingsPanel articleId={draftId} />
                    </div>
                    <Publish draft={draft?.findArticle!} />
                  </div>
                </header>
                <main className="py-14">
                  <div className="space-y-5">
                    <TitleInput />
                    <table>
                      <tbody className="space-y-3">
                        <tr className="flex items-center space-x-3">
                          <th>
                            <HiUserCircle className="text-gray-400 w-6 h-6" />
                          </th>
                          <td className="text-gray-600 font-semibold">
                            Published by Kevin Lu
                          </td>
                        </tr>
                        <tr className="flex items-center space-x-3">
                          <th>
                            <HiTag className="text-gray-400 w-6 h-6" />
                          </th>
                          <td className="flex items-center space-x-2">
                            {draft?.findArticle?.tags.length === 0 ? (
                              <span className="text-gray-600">
                                No Tags Found
                              </span>
                            ) : (
                              draft?.findArticle?.tags.map((tag) => (
                                <div
                                  key={tag}
                                  className="px-4 py-1 rounded-lg bg-gray-100 text-gray-600 font-semibold text-sm"
                                >
                                  <span className="text-gray-400">#</span>
                                  {tag}
                                </div>
                              ))
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <hr className="my-10" />
                  <TipTapEditor draft={draft?.findArticle || null} />
                </main>
              </div>
            </div>
            <div className="hidden xl:block flex-shrink-0">
              <SettingsSidebar articleId={draftId} />
            </div>
            <AutoSave setDiff={setDiff} />
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(DraftPage);
