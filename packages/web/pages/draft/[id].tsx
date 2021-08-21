import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import dynamic from "next/dynamic";
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
      <div className="max-w-3xl mx-auto px-0 sm:px-12 py-12 md:py-20 lg:py-24 xl:py-32">
        <input
          type="text"
          value={draft?.findArticle?.title}
          className="text-5xl font-bold w-full mb-4"
        />
        <TipTapEditor />
      </div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(DraftPage);
