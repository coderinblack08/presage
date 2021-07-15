import { formatDistanceToNow } from "date-fns";
import React from "react";
import { useQuery } from "react-query";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Article, Comment } from "../../lib/types";

interface CommentSectionProps {
  article: Article;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ article }) => {
  const { data: comments } = useQuery<Comment[]>(`/comments/${article.id}`);

  return (
    <aside className="bg-white rounded-lg p-4 shadow">
      <h6 className="font-bold">All Comments</h6>
      <div className="relative mt-3">
        <Input
          className="pb-14"
          placeholder="Join the discussion"
          textarea
          gray
        />
        <div className="absolute bottom-0 right-0 mb-4 mx-2">
          <Button color="white" disabled>
            Send
          </Button>
        </div>
      </div>
      <ul className="divide-y divide-gray-200">
        {comments?.map((comment) => (
          <li className="py-6 px-2" key={comment.id}>
            <div className="flex items-center space-x-3">
              <img
                src={comment.user.profilePicture}
                alt={comment.user.displayName}
                className="w-6 h-6 rounded-full object-cover object-center"
              />
              <p className="font-bold">{comment.user.displayName}</p>
            </div>
            <p className="text-gray-600 mt-2">{comment.message}</p>
            <div className="flex items-center mt-2">
              <p className="text-gray-500 pr-4">
                {formatDistanceToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                }).replace("about ", "")}
              </p>
              <div className="border-r border-gray-200 h-4" />
              <a href="#" className="font-bold text-gray-500 pl-4">
                Show Replies
              </a>
            </div>
          </li>
        ))}
      </ul>
      {/* <a href="#" className="inline-block font-bold px-2 pb-1f">
        Show More ↓
      </a> */}
    </aside>
  );
};
