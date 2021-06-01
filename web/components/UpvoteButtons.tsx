import { ApolloCache } from "@apollo/client";
import { useSoundbiteQuery, useVoteMutation, VoteMutation } from "@presage/gql";
import gql from "graphql-tag";
import React from "react";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";

interface UpvoteButtonsProps {
  id: string;
}

const updateAfterVote = (
  value: number,
  soundbiteId: string,
  cache: ApolloCache<VoteMutation>
) => {
  const data = cache.readFragment<{
    id: number;
    points: number;
    voteStatus: number | null;
  }>({
    id: "Soundbite:" + soundbiteId,
    fragment: gql`
      fragment _ on Soundbite {
        id
        points
        voteStatus
      }
    `,
  });

  if (data) {
    if (data.voteStatus === value) {
      return;
    }
    const newPoints =
      (data.points as number) + (!data.voteStatus ? 1 : 2) * value;
    cache.writeFragment({
      id: "Soundbite:" + soundbiteId,
      fragment: gql`
        fragment __ on Soundbite {
          points
          voteStatus
        }
      `,
      data: { points: newPoints, voteStatus: value },
    });
  }
};

export const UpvoteButtons: React.FC<UpvoteButtonsProps> = ({ id }) => {
  const [vote] = useVoteMutation();
  const { data } = useSoundbiteQuery({ variables: { id } });
  const status = data?.getSoundbite.voteStatus;

  return (
    <div className="flex flex-col items-center space-y-1 mr-6">
      <button
        onClick={async () => {
          vote({
            variables: { soundbiteId: id, value: 1 },
            update: (cache) => updateAfterVote(1, id, cache),
          });
        }}
        className={`p-1 focus:outline-none hover:text-primary hover:bg-primary hover:bg-opacity-10 rounded-md ${
          status === 1
            ? "text-primary bg-primary bg-opacity-10"
            : "text-light-gray"
        }`}
      >
        <MdArrowUpward className="w-4 h-4" />
      </button>
      <p className={`small font-bold ${status !== null ? "text-primary" : ""}`}>
        {data?.getSoundbite.points}
      </p>
      <button
        onClick={async () => {
          vote({
            variables: { soundbiteId: id, value: -1 },
            update: (cache) => updateAfterVote(-1, id, cache),
          });
        }}
        className={`p-1 focus:outline-none hover:text-primary hover:bg-primary hover:bg-opacity-10 rounded-md ${
          status === -1
            ? "text-primary bg-primary bg-opacity-10"
            : "text-light-gray"
        }`}
      >
        <MdArrowDownward className="w-4 h-4" />
      </button>
    </div>
  );
};
