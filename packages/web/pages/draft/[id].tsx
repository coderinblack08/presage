import { IconLink } from "@tabler/icons";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { Button } from "../../components/button";
import { useFindArticleQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../lib/createUrqlClient";
import { Layout } from "../../modules/dashboard/Layout";
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
      <div className="flex justify-between h-full w-full">
        <div className="w-full h-full">
          <div className="max-w-4xl w-full mx-auto px-14 py-8">
            <header className="flex items-center justify-between">
              <div className="flex items-center space-x-2 max-w-sm">
                <span className="text-gray-900 font-bold max-w-[10rem] flex-shrink-0 overflow-auto whitespace-nowrap">
                  {draft?.findArticle?.journal.name}
                </span>
                <span className="text-gray-300 font-bold">/</span>
                <span className="text-gray-500 min-w-0 truncate">
                  {draft?.findArticle?.title} Buying starbucks stock instead of
                  coffee every morning
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button icon={<IconLink size={20} />} size="small" outline />
                <Button outline>Publish</Button>
              </div>
            </header>
            <Formik
              initialValues={{
                title: draft?.findArticle?.title || "",
                canonical: "",
                description: "",
                tags: "",
              }}
              onSubmit={() => {}}
            >
              {({ values, setFieldValue, setTouched }) => (
                <Form>
                  <main className="mt-14">
                    <TitleInput />
                    <hr className="my-8" />
                    <TipTapEditor />
                  </main>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <SettingsSidebar />
      </div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(DraftPage);
