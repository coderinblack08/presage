import { doc, getFirestore, setDoc } from "@firebase/firestore";
import React from "react";
import {
  MdBookmark,
  MdBookmarkBorder,
  MdFavorite,
  MdFavoriteBorder,
} from "react-icons/md";
import useSWR, { mutate } from "swr";
import { Button } from "../../components/button";
import { Article } from "../../types";
import { useUser } from "../authentication/useUser";

interface ReactionsProps {
  article: Article | undefined;
}

export const Reactions: React.FC<ReactionsProps> = ({ article }) => {
  const { uid } = useUser();
  const { data: liked, mutate: mutateLiked } = useSWR(
    `/api/article/${article?.id}/is-reaction?type=liked`
  );
  const { data: bookmarked, mutate: mutateBookmarked } = useSWR(
    `/api/article/${article?.id}/is-reaction?type=bookmarked`
  );
  const values = { userId: uid, articleId: article?.id };

  return (
    <div className="flex items-center space-x-8">
      <Button
        onClick={async () => {
          const ref = doc(getFirestore(), "reactions", `${uid}-${article?.id}`);
          mutate(
            `/api/article/${article?.id}`,
            (old: Article) => ({
              ...old,
              likeCount: old.likeCount + (liked ? -1 : 1),
            }),
            false
          );
          mutateLiked(!liked, false);
          console.log(liked);
          if (liked) {
            await setDoc(ref, { ...values, liked: false }, { merge: true });
          } else {
            await setDoc(ref, { ...values, liked: true }, { merge: true });
          }
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
        icon={
          bookmarked ? (
            <MdBookmark className="w-6 h-6" />
          ) : (
            <MdBookmarkBorder className="w-6 h-6" />
          )
        }
        onClick={async () => {
          const ref = doc(getFirestore(), "reactions", `${uid}-${article?.id}`);
          mutate(
            `/api/article/${article?.id}`,
            (old: Article) => ({
              ...old,
              bookmarkCount: old.bookmarkCount + (bookmarked ? -1 : 1),
            }),
            false
          );
          mutateBookmarked(!bookmarked, false);
          if (bookmarked) {
            await setDoc(
              ref,
              { ...values, bookmarked: false },
              { merge: true }
            );
          } else {
            await setDoc(ref, { ...values, bookmarked: true }, { merge: true });
          }
        }}
        className="text-gray-500"
        color="transparent"
        size="none"
      >
        <span className="font-medium">{article?.bookmarkCount}</span>
      </Button>
    </div>
  );
};
