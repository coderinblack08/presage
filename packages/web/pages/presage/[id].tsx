import { format } from "date-fns";
import { GetServerSideProps } from "next";
import React from "react";
import {
  MdComment,
  MdPlayArrow,
  MdPlaylistAdd,
  MdThumbUp,
} from "react-icons/md";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { Button } from "../../components/Button";
import { Layout } from "../../components/Layout";
import { Spinner } from "../../components/Spinner";
import { fetcher } from "../../lib/fetcher";
import { LikeButton } from "../../modules/feed/LikeButton";
import { PresageCardLeftSide } from "../../modules/feed/PresageCardLeftSide";
import { AvatarGroup } from "../../modules/presage/AvatarGroup";
import { usePlayerStore } from "../../store/usePlayerStore";
import { Presage } from "../../types";

const PresagePage: React.FC<{ id: string }> = ({ id }) => {
  const { data, isFetching } = useQuery<Presage>(`/api/presage/${id}`);
  const play = usePlayerStore((x) => x.play);

  return (
    <Layout>
      {isFetching ? (
        <Spinner />
      ) : (
        <main className="max-w-3xl mx-auto">
          <AvatarGroup user={data.user} />
          <article className="flex space-x-10 mt-8">
            <PresageCardLeftSide presage={data} />
            <div>
              <h4>{data.title}</h4>
              <p className="text-gray-200">
                {format(new Date(data.createdAt), "MMMM d, yyyy")} · 3:24
              </p>
              <p className="mt-1.5 leading-7 text-gray-300">
                {data.description}
              </p>
            </div>
          </article>
          <div className="flex justify-between w-full border-t border-b border-gray-700 py-3 my-10">
            <LikeButton presage={data} />
            <Button
              icon={<MdComment className="w-6 h-6" />}
              color="transparent"
              size="sm"
            >
              <span className="font-bold">Comment</span>
            </Button>
            <Button
              icon={<MdPlaylistAdd className="w-6 h-6" />}
              color="transparent"
              size="sm"
            >
              <span className="font-bold">Bookmark</span>
            </Button>
          </div>
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
