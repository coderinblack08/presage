import { format } from "date-fns";
import formatDuration from "format-duration";
import { GetServerSideProps } from "next";
import React from "react";
import { MdPlaylistAdd } from "react-icons/md";
import { useQuery } from "react-query";
import { Button } from "../../components/Button";
import { Layout } from "../../components/Layout";
import { Spinner } from "../../components/Spinner";
import { LikeButton } from "../../modules/feed/LikeButton";
import { PresageCardLeftSide } from "../../modules/feed/PresageCardLeftSide";
import { useDuration } from "../../modules/feed/useDuration";
import { AvatarGroup } from "../../modules/presage/AvatarGroup";
import { CommentModal } from "../../modules/presage/CommentModal";
import { CommentTree } from "../../modules/presage/CommentTree";
import { TreePresageResponse } from "../../types";

const PresagePage: React.FC<{ id: string }> = ({ id }) => {
  const { data, isFetching } = useQuery<TreePresageResponse>(
    `/api/presage/${id}`
  );
  const duration = useDuration(data?.tree);

  return (
    <Layout>
      {isFetching && !data?.tree ? (
        <Spinner />
      ) : (
        <main className="max-w-2xl mx-auto">
          <AvatarGroup user={data?.tree.user} />
          <article className="flex space-x-8 mt-6">
            <PresageCardLeftSide presage={data?.tree} noAvatar />
            <div>
              <h4>{data?.tree.title}</h4>
              <p className="text-gray-200">
                <span className="font-semibold text-gray-100">
                  {duration ? formatDuration(duration) + " · " : null}
                </span>
                {format(new Date(data?.tree.createdAt), "MMMM d, yyyy")}
              </p>
              <p
                className={`mt-1.5 leading-7 ${
                  data?.tree.type === "audio" ? "" : "text-lg"
                }`}
              >
                {data?.tree.description || data?.tree.content}
              </p>
            </div>
          </article>
          <div className="flex justify-between w-full border-t border-b border-gray-800 py-3 my-10">
            <LikeButton presage={data?.tree} />
            <CommentModal presage={data?.tree} />
            <Button
              icon={<MdPlaylistAdd className="w-6 h-6" />}
              color="transparent"
              size="sm"
            >
              <span className="font-bold">Bookmark</span>
            </Button>
          </div>
          <CommentTree comments={data?.tree.children} />
        </main>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (props) => {
  return {
    props: {
      id: props.query.id,
    },
  };
};

export default PresagePage;
