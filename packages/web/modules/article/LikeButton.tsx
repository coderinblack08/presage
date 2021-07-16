import React from "react";
import { Heart } from "react-iconly";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { Button } from "../../components/Button";
import { mutator } from "../../lib/mutator";
import { Article } from "../../lib/types";

interface LikeButtonProps {
  article: Article;
}

export const LikeButton: React.FC<LikeButtonProps> = ({ article }) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(mutator);
  const updateCache = async () => {
    await mutateAsync(["/articles/like", { articleId: article.id }, "post"], {
      onSuccess: () => {
        const newData = {
          liked: !article.liked,
          points: article.points - (article.liked ? 1 : -1),
        };
        queryClient.setQueryData<Article>(
          `/articles/${article.id}`,
          (old) =>
            ({
              ...old,
              ...newData,
            } as any)
        );
        queryClient.refetchQueries(`/articles/explore`);
      },
    });
  };

  return (
    <Button
      color="transparent"
      size="none"
      onClick={updateCache}
      icon={
        article.liked ? (
          <MdFavorite className="w-6 h-6 text-gray-600" />
        ) : (
          <MdFavoriteBorder className="w-6 h-6 text-gray-600" />
        )
      }
      noAnimate
    >
      <span className={`${article.liked ? "font-semibold" : ""} text-gray-600`}>
        {article.points}
      </span>
    </Button>
  );
};