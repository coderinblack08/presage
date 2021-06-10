import { GetServerSideProps } from "next";
import React from "react";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { Layout } from "../../components/Layout";
import { Spinner } from "../../components/Spinner";
import { fetcher } from "../../lib/fetcher";
import { EditModal } from "../../modules/user/EditModal";
import { User } from "../../types";

const UserPage: React.FC<{ username: string }> = ({ username }) => {
  const { data, isFetching } = useQuery<User>(`/api/auth/${username}`);
  const { data: me } = useQuery<User>("/api/me");

  return (
    <Layout>
      {isFetching ? (
        <Spinner />
      ) : (
        <main className="max-w-3xl mx-auto">
          <div className="flex space-x-10">
            <img
              src={data.profilePicture}
              alt={data.displayName}
              className="rounded-full w-32 h-32"
            />
            <div>
              <h4>{data.displayName}</h4>
              <p className="text-gray-300">@{data.username}</p>
              {data.bio && <p className="mt-2 text-gray-200">{data.bio}</p>}
              {me?.username === username ? <EditModal /> : null}
            </div>
          </div>
          <nav className="flex items-center space-x-12 mt-14">
            <a
              href="#"
              className="font-sans font-bold pb-4 border-b-2 border-gray-100"
            >
              Activity
            </a>
            <a
              href="#"
              className="text-gray-300 font-sans font-bold pb-4 border-b-2 border-gray-800"
            >
              Likes
            </a>
          </nav>
          <div className="w-full bg-gray-800 h-[2px] mt-[-2px]" />
        </main>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query: { username },
}) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(`/api/auth/${username}`, fetcher);

  return { props: { username, dehydratedState: dehydrate(queryClient) } };
};

export default UserPage;
