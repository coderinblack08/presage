import React from "react";
import {
  MdBookmarkBorder,
  MdFavorite,
  MdFavoriteBorder,
  MdShare,
} from "react-icons/md";
import { Button } from "../../components/button";
import { ArticleFragment, useFavoriteMutation } from "../../generated/graphql";

interface ReactionsProps {
  article: ArticleFragment;
}

export const Reactions: React.FC<ReactionsProps> = ({ article }) => {
  const [, favorite] = useFavoriteMutation();

  return (
    <div className="flex items-center space-x-8">
      <Button
        onClick={async () => {
          try {
            await favorite({ articleId: article.id });
          } catch {}
        }}
        icon={
          article.isFavored ? (
            <MdFavorite className="w-6 h-6" />
          ) : (
            <MdFavoriteBorder className="w-6 h-6" />
          )
        }
        className="text-gray-500"
        color="transparent"
        size="none"
      >
        <span className="font-medium">{article.points}</span>
      </Button>
      <Button
        icon={<MdBookmarkBorder className="w-6 h-6" />}
        className="text-gray-500"
        color="transparent"
        size="none"
      >
        <span className="font-medium">12</span>
      </Button>
      <Button
        icon={<MdShare className="w-6 h-6" />}
        className="text-gray-500"
        color="transparent"
        size="none"
      >
        <span className="font-medium">89</span>
      </Button>
    </div>
  );
};
