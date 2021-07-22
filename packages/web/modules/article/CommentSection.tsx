import { formatDistanceToNow } from "date-fns";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { mutator } from "../../lib/mutator";
import { Article, Comment, User } from "../../lib/types";

interface CommentSectionProps {
  article: Article;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ article }) => {
  const { data: comments } = useQuery<Comment[]>(`/comments/${article.id}`);
  const { data: me } = useQuery<User>("/me");
  const [message, setMessage] = useState("");
  const { mutateAsync } = useMutation(mutator);
  const queryClient = useQueryClient();

  return (
    <aside>
      <h6 className="font-bold">All Comments</h6>
      <form
        className="relative mt-2.5"
        onSubmit={async (e) => {
          e.preventDefault();
          await mutateAsync([`/comments/${article.id}`, { message }, "post"], {
            onSuccess: (comment) => {
              comment = { ...comment, user: me };
              queryClient.setQueryData<Comment[]>(
                `/comments/${article.id}`,
                (old) => (old ? [comment, ...old] : [comment])
              );
              setMessage("");
            },
          });
        }}
      >
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="pb-14"
          placeholder="Join the discussion"
          textarea
        />
        <div className="absolute bottom-0 right-0 mb-4 mx-2">
          <Button type="submit" disabled={message.trim().length === 0}>
            Send
          </Button>
        </div>
      </form>
      <ul className="mt-8 space-y-10">
        {comments?.map((comment) => (
          <li key={comment.id}>
            <div className="flex items-center space-x-3">
              <img
                src={comment.user.profilePicture}
                alt={comment.user.displayName}
                className="w-6 h-6 rounded-full object-cover object-center"
              />
              <div>
                <span className="font-bold">{comment.user.displayName}</span> ·{" "}
                <span className="text-gray-500 pr-4">
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                  }).replace("about ", "")}
                </span>
              </div>
            </div>
            <p className="text-gray-600 mt-2">{comment.message}</p>
            <div className="flex items-center mt-2"></div>
          </li>
        ))}
      </ul>
    </aside>
  );
};
