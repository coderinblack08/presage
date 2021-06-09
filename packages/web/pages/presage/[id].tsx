import { GetServerSideProps } from "next";
import React from "react";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Layout } from "../../components/Layout";
import { Spinner } from "../../components/Spinner";
import { fetcher } from "../../lib/fetcher";
import { PresageCard } from "../../modules/feed/PresageCard";
import { Presage } from "../../types";

const PresagePage: React.FC<{ id: string }> = ({ id }) => {
  const { data, isFetching } = useQuery<Presage>(`/api/presage/${id}`);

  return (
    <Layout>
      {isFetching ? (
        <Spinner />
      ) : (
        <main className="max-w-3xl mx-auto">
          <PresageCard presage={data} />
          <hr className="border-b border-gray-800 my-16" />
          <div className="flex items-center space-x-2">
            <Input placeholder="What are your thoughts?" />
            <Button>Comment</Button>
          </div>
          <a href="#" className="text-gray-300 small mt-2 inline-block">
            Or reply with a{" "}
            <span className="small text-primary">Audio Presage</span>
          </a>
        </main>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query: { id },
}) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(`/api/presage/${id}`, fetcher);

  return {
    props: { id, dehydratedState: dehydrate(queryClient) },
  };
};

export default PresagePage;
