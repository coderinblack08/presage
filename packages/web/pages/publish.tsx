import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { ssrFetcher } from "../lib/fetcher";
import { Article } from "../lib/types";
import { DraftSidebar } from "../modules/draft/DraftSidebar";

const Publish: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ draftId }) => {
  const { data: draft } = useQuery<Article>(`/articles/draft/${draftId}`);

  return (
    <div className="flex items-start">
      <div className="w-full max-w-xs">
        <DraftSidebar />
      </div>
      <div className="w-full h-screen overflow-y-scroll bg-white">
        <header className="p-6">{draft?.title}</header>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    "/journals/me",
    ssrFetcher(context.req.cookies.jid)
  );
  await queryClient.prefetchQuery("/me", ssrFetcher(context.req.cookies.jid));
  await queryClient.prefetchQuery(
    "/rewards",
    ssrFetcher(context.req.cookies.jid)
  );
  const draftId = context.query.draftId?.toString() || "";

  return {
    props: {
      draftId,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Publish;
