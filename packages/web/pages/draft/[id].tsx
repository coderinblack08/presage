import { IconLink } from "@tabler/icons";
import { Form, Formik } from "formik";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";
import { Button } from "../../components/button";
import { baseURL } from "../../lib/constants";
import { fetcher } from "../../lib/fetcher";
import { Sidebar } from "../../modules/dashboard/sidebar/Sidebar";
import AutoSave from "../../modules/editor/AutoSave";
import { DraftTable } from "../../modules/editor/DraftTable";
import { Publish } from "../../modules/editor/Publish";
import { SettingsPanel } from "../../modules/editor/settings/SettingsPanel";
import { SettingsSidebar } from "../../modules/editor/settings/SettingsSidebar";
import { TipTapEditor } from "../../modules/editor/TipTapEditor";
import { TitleInput } from "../../modules/editor/TitleInput";
import { Article } from "../../types";

const DraftPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ id }) => {
  const { data: draft } = useSWR<Article>(`/api/draft/${id}`);
  const [diff, setDiff] = useState<any | null>(null);
  const { push } = useRouter();

  return (
    <div className="flex">
      <Sidebar />
      <Formik
        initialValues={{ editorJSON: draft?.editorJSON, title: draft?.title }}
        onSubmit={async (values) => {
          console.log(values);
        }}
      >
        <Form className="flex w-full">
          <main className="h-screen w-full">
            <div className="max-w-4xl w-full mx-auto px-0 sm:px-6 md:px-14 py-5 md:py-7 overflow-y-auto h-full">
              <header className="flex items-center justify-between">
                <div className="flex items-center space-x-2 max-w-sm">
                  <span className="text-gray-900 font-bold max-w-[10rem] flex-shrink-0 overflow-auto whitespace-nowrap">
                    {draft?.journal?.name}
                  </span>
                  <span className="text-gray-300 font-bold">/</span>
                  <span className="text-gray-500 min-w-0 truncate">
                    {draft?.title}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    type="button"
                    icon={<IconLink size={20} />}
                    size="small"
                    onClick={() => push(`/article/${id}`)}
                    disabled={!draft?.isPublished}
                    outline
                  />
                  <div className="block xl:hidden">
                    <SettingsPanel draft={draft as any} />
                  </div>
                  <Publish draft={draft as any} />
                </div>
              </header>
              <div className="py-12 w-full mx-auto">
                <div className="space-y-5">
                  <TitleInput />
                  <DraftTable draft={draft} />
                </div>
                <hr className="my-10" />
                <TipTapEditor draft={draft} />
              </div>
            </div>
          </main>
          <div className="hidden xl:block flex-shrink-0">
            <SettingsSidebar draft={draft as any} />
          </div>
          <AutoSave setDiff={setDiff} />
        </Form>
      </Formik>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const id = query.id?.toString();
  const draft = await fetcher(`${baseURL}/api/draft/${id}`, req.headers.cookie);
  const account = await fetcher(`${baseURL}/api/account`, req.headers.cookie);

  return {
    props: {
      id,
      fallback: {
        [`/api/draft/${id}`]: draft,
        "/api/account": account,
      },
    },
  };
};

export default DraftPage;
