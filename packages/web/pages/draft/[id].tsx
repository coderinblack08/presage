import { IconLink } from "@tabler/icons";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { HiTag, HiUserCircle } from "react-icons/hi";
import { Button } from "../../components/button";
import { useFindArticleQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../lib/createUrqlClient";
import { Layout } from "../../modules/dashboard/Layout";
import AutoSave from "../../modules/editor/AutoSave";
import { SettingsSidebar } from "../../modules/editor/SettingsSidebar";
import { TipTapEditor } from "../../modules/editor/TipTapEditor";
import { TitleInput } from "../../modules/editor/TitleInput";

const DraftPage: NextPage = () => {
  const {
    query: { id },
  } = useRouter();
  const [{ data: draft }] = useFindArticleQuery({
    variables: { id: id?.toString() || "" },
  });

  return (
    <Layout>
      <Formik
        initialValues={{
          title: draft?.findArticle?.title || "",
          canonical: "",
          description: "",
          tags: "",
          html: draft?.findArticle?.html || "",
          editorJSON: draft?.findArticle?.editorJSON || "",
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        enableReinitialize
      >
        {() => (
          <Form className="flex justify-between h-full w-full">
            <div className="w-full h-full">
              <div className="max-w-4xl w-full mx-auto px-0 sm:px-6 md:px-14 py-8 overflow-y-auto h-full">
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
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      icon={<IconLink size={20} />}
                      size="small"
                      outline
                    />
                    <Button type="button" outline>
                      Publish
                    </Button>
                  </div>
                </header>
                <main className="mt-14">
                  <div className="space-y-5">
                    <TitleInput />
                    <table className="space-y-3">
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
                          <div className="px-4 py-1 rounded-lg bg-gray-100 text-gray-600 font-semibold text-sm">
                            <span className="text-gray-400">#</span>stocks
                          </div>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <hr className="my-10" />
                  <TipTapEditor />
                </main>
              </div>
            </div>
            <SettingsSidebar />
            <AutoSave />
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(DraftPage);
