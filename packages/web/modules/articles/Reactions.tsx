import React from "react";
import {
  MdBookmark,
  MdBookmarkBorder,
  MdFavorite,
  MdFavoriteBorder,
  MdShare,
} from "react-icons/md";
import { Button } from "../../components/button";
import {
  ArticleFragment,
  FavoriteType,
  useFavoriteMutation,
} from "../../generated/graphql";

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
        onClick={async () => {
          try {
            await favorite({
              articleId: article.id,
              type: FavoriteType.Bookmark,
            });
          } catch {}
        }}
        icon={
          article.isBookmarked ? (
            <MdBookmark className="w-6 h-6" />
          ) : (
            <MdBookmarkBorder className="w-6 h-6" />
          )
        }
        className="text-gray-500"
        color="transparent"
        size="none"
      >
        <span className="font-medium">{article.bookmarks}</span>
      </Button>
      <Button
        icon={<MdShare className="w-6 h-6" />}
        className="text-gray-500"
        color="transparent"
        size="none"
      >
        <span className="font-medium">0</span>
      </Button>
    </div>
  );
};
