import { GetServerSideProps } from "next";
import React from "react";
import { fetcher } from "../lib/fetcher";

interface PublishProps {}

const Publish: React.FC<PublishProps> = ({}) => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const lastOpened = await fetcher<{ id: string }>(
    { queryKey: "/articles/last-opened" },
    context.req.cookies.jid
  );

  return {
    redirect: {
      destination: `/draft/${lastOpened.id}`,
      permanent: false,
    },
  };
};

export default Publish;
