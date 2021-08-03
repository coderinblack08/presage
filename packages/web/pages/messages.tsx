import { GetServerSideProps } from "next";
import React from "react";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { ssrFetcher } from "../lib/fetcher";
import { DirectMessage, User } from "../lib/types";
import { DashboardLayout } from "../modules/draft/DashboardLayout";

const Messages: React.FC = () => {
  return <DashboardLayout message></DashboardLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("/me", ssrFetcher(context.req.cookies.jid));
  await queryClient.prefetchQuery(
    "/messages/dms",
    ssrFetcher(context.req.cookies.jid)
  );

  const me = queryClient.getQueryData<User>("/me");
  if (!me) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const dms = queryClient.getQueryData<DirectMessage[]>("/messages/dms");
  if (dms && dms.length > 0) {
    return {
      redirect: {
        destination: `/chat/${dms[0].id}`,
        permanent: true,
      },
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Messages;
