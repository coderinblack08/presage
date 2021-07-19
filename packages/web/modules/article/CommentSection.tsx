import { formatDistanceToNow } from "date-fns";
import { addMinutes } from "date-fns";
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
    <aside>
      <h6 className="font-bold">All Comments</h6>
      <div className="relative mt-2.5">
        <Input className="pb-14" placeholder="Join the discussion" textarea />
        <div className="absolute bottom-0 right-0 mb-4 mx-2">
          <Button disabled>Send</Button>
        </div>
      </div>
      <ul>
        {comments?.map((comment) => (
          <li className="py-6" key={comment.id}>
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
                {formatDistanceToNow(
                  addMinutes(
                    new Date(comment.createdAt),
                    new Date(comment.createdAt).getTimezoneOffset()
                  ),
                  {
                    addSuffix: true,
                  }
                ).replace("about ", "")}
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
