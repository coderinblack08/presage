import React from "react";
import { TicketStar, Bookmark, Chat, Heart } from "react-iconly";
import { MdBookmark, MdChat, MdReply, MdThumbUp } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { Button } from "../../components/Button";
import { mutator } from "../../lib/mutator";
import { Article } from "../../lib/types";

interface BottomBarProps {
  article: Article;
}

export const BottomBar: React.FC<BottomBarProps> = ({ article }) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(mutator);

  return (
    <div className="fixed w-full max-w-4xl bottom-0 bg-gray-700/75 backdrop-blur-lg border-t border-gray-600 py-6 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-6">
          <Button>Refer to Friend</Button>
          <div className="flex items-center space-x-2">
            <TicketStar set="bulk" />
            <p className="text-gray-300">
              Earn <span className="text-gray-200 font-bold">+1</span> Reward
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-8">
        <Button
          color="transparent"
          size="none"
          icon={<MdThumbUp className="w-6 h-6" />}
          onClick={async () => {
            await mutateAsync(
              ["/articles/like", { articleId: article.id }, "post"],
              {
                onSuccess: () => {},
              }
            );
          }}
        >
          <span>{article.points}</span>
        </Button>
        <button>
          <MdChat className="w-6 h-6" />
        </button>
        <button>
          <MdBookmark className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
