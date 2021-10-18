import { doc, getFirestore, setDoc } from "@firebase/firestore";
import React from "react";
import {
  MdBookmark,
  MdBookmarkBorder,
  MdFavorite,
  MdFavoriteBorder,
} from "react-icons/md";
import { useQuery, useQueryClient } from "react-query";
import { Button } from "../../components/button";
import { Article } from "../../types";
import { useUser } from "../authentication/useUser";
import { Share } from "./Share";
import { useReactionMutation } from "./useReactionMutation";

interface ReactionsProps {
  article: Article | undefined;
}

export const Reactions: React.FC<ReactionsProps> = ({ article }) => {
  const { uid } = useUser();
  const queryClient = useQueryClient();
  const { data: liked } = useQuery(
    `/api/article/${article?.id}/is-reaction?type=liked`
  );
  const { data: bookmarked } = useQuery(
    `/api/article/${article?.id}/is-reaction?type=bookmarked`
  );
  const values = { userId: uid, articleId: article?.id };
  const { mutateAsync } = useReactionMutation();

  return (
    <div className="flex items-center space-x-8">
      <Button
        disabled={!uid}
        onClick={async () => {
          await mutateAsync({ values, type: "like" });
        }}
        icon={
          liked ? (
            <MdFavorite className="w-6 h-6" />
          ) : (
            <MdFavoriteBorder className="w-6 h-6" />
          )
        }
        className="text-gray-500"
        color="transparent"
        size="none"
      >
        <span className="font-medium">{article?.likeCount}</span>
      </Button>
      <Button
        disabled={!uid}
        icon={
          bookmarked ? (
            <MdBookmark className="w-6 h-6" />
          ) : (
            <MdBookmarkBorder className="w-6 h-6" />
          )
        }
        onClick={async () => {
          await mutateAsync({ values, type: "bookmark" });
        }}
        className="text-gray-500"
        color="transparent"
        size="none"
      >
        <span className="font-medium">{article?.bookmarkCount}</span>
      </Button>
      <Share article={article} />
    </div>
  );
};
