import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useFindArticleQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../lib/createUrqlClient";
import { Layout } from "../../modules/dashboard/Layout";
import { TipTapEditor } from "../../modules/editor/TipTapEditor";

const DraftPage: NextPage = () => {
  const {
    query: { id },
  } = useRouter();
  const [{ data: draft }] = useFindArticleQuery({
    variables: { id: id?.toString() || "" },
  });

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-0 sm:px-12 py-12 md:py-20 lg:py-24 xl:py-32">
        <input
          type="text"
          value={draft?.findArticle?.title}
          className="text-5xl font-bold w-full"
        />
        <div className="mt-2.5">
          <p className="text-gray-500 space-x-2 mt-2">
            <span>#engineering</span> <span>#100daysofcode</span>
          </p>
        </div>
        <hr className="my-9 border-gray-200/50" />
        <TipTapEditor />
      </div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(DraftPage);
