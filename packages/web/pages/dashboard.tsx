import { IconSearch } from "@tabler/icons";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { Input } from "../components/input";
import { baseURL } from "../lib/constants";
import { fetcher } from "../lib/fetcher";
import { Layout } from "../modules/dashboard/Layout";

const Dashboard: NextPage = ({}) => {
  return (
    <Layout>
      <div className="w-full">
        <header className="border-b">
          <div className="mx-auto max-w-5xl w-full px-8 pt-16 pb-24">
            <h1 className="font-display font-bold text-3xl">Getting Started</h1>
            <p className="text-gray-500 max-w-xl mt-3">
              Presage is a feature packed platform with an intuitive design. The
              getting started page is supposed to be used as a FAQ, guide, and
              reference.
            </p>
          </div>
        </header>
        <div className="w-full max-w-md mx-auto -mt-6">
          <Input
            className="rounded-full"
            icon={<IconSearch className="text-gray-400 w-6 h-6" />}
            placeholder="Search Guides"
            shortcut="/"
            outline
          />
        </div>
        <main className="max-w-5xl px-8 py-10 w-full mx-auto">
          <h2 className="font-bold font-display mb-3">Guides & Tutorials</h2>
          <div className="grid grid-cols-2 gap-4">
            <a className="block border shadow-sm rounded-xl p-6 ">
              <h2 className="font-bold text-xl">
                The Process of Brainstorming
              </h2>
              <p className="text-gray-500 mt-1">
                12 minute read · By J.K. Rowling
              </p>
            </a>
            <a className="block border shadow-sm rounded-xl p-5">
              <h2 className="font-bold text-xl">
                The Process of Brainstorming
              </h2>
              <p className="text-gray-500 mt-1">
                12 minute read · By J.K. Rowling
              </p>
            </a>
          </div>
          <p className="mt-4 text-gray-500 text-sm leading-relaxed max-w-xl">
            Would you like to write a guide on writing for us? Do you have any
            other questions? If so reach out to us at{" "}
            <a
              href="mailto:help@joinpreage.com"
              className="text-gray-600 font-bold text-sm"
            >
              help@joinpreage.com
            </a>
            .
          </p>
        </main>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const account = await fetcher(
    `${baseURL}/api/account`,
    context.req.headers.cookie
  );

  return {
    props: {
      fallback: {
        "/api/account": account,
      },
    },
  };
};

export default Dashboard;
