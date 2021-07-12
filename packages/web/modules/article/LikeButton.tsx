import React from "react";
import { Heart } from "react-iconly";
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
      color={article.liked ? "primary" : "gray"}
      size="small"
      onClick={updateCache}
      icon={
        <div className={`${article.liked ? "text-white" : ""} scale-80`}>
          <Heart set="bold" size="small" />
        </div>
      }
      noAnimate
    >
      <span
        className={`${article.liked ? "text-white" : ""} font-semibold small`}
      >
        {article.points} like{article.points !== 1 ? "s" : ""}
      </span>
    </Button>
  );
};
