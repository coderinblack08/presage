import React, { useMemo, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";
import { Comment as IComment } from "../../types";

interface CommentProps {
  comment: IComment;
  layer?: number;
  existingPath: string;
  articleId: string;
  setCommentPath: React.Dispatch<React.SetStateAction<string>>;
  setReplyingComment: React.Dispatch<React.SetStateAction<IComment | null>>;
}

export const Comment: React.FC<CommentProps> = ({
  comment,
  layer = 1,
  setCommentPath,
  setReplyingComment,
  existingPath,
  articleId,
}) => {
  const path = useMemo(
    () => `${existingPath}/${comment.id}${"/comments".repeat(layer)}`,
    [comment.id, existingPath, layer]
  );
  const [showReplies, setShowReplies] = useState(false);
  const { data: comments } = useSWR<IComment[]>(
    showReplies ? `/api/comments?path=${path}` : null
  );

  return (
    <div>
      <div className="flex space-x-5">
        <div className="flex flex-col items-center">
          <img
            className={`object-cover w-12 h-12 rounded-xl ${
              !comment.user?.profilePicture ? "border shadow-sm" : ""
            }`}
            src={comment.user?.profilePicture || "/static/default-picture.svg"}
            alt={comment.user?.displayName}
          />
          {showReplies ? <div className="h-full w-[2px] bg-gray-100" /> : null}
        </div>
        <div>
          <h6 className="font-bold">{comment.user.displayName}</h6>
          <p className="text-gray-500 text-sm">@{comment.user.username}</p>
          <p className="text-gray-800 my-3">{comment.message}</p>
          <div className="flex items-center">
            <span className="text-gray-500 pr-3 text-sm">2 days ago</span>
            <div className="h-5 w-[1px] bg-gray-300" />
            <button
              onClick={() => {
                setCommentPath(path);
                setReplyingComment(comment);
              }}
              className="text-gray-500 font-bold px-3 text-sm"
            >
              Reply
            </button>
            {comment.replyCount ? (
              <>
                <div className="h-5 w-[1px] bg-gray-300" />
                <button
                  onClick={() => setShowReplies(!showReplies)}
                  className="text-gray-500 font-bold pl-3 text-sm"
                >
                  {showReplies ? "Hide" : "Show"} Replies ({comment.replyCount})
                </button>
              </>
            ) : null}
          </div>
          {showReplies && (
            <div className="mt-12 space-y-12">
              {comments?.map((comment) => (
                <Comment
                  articleId={articleId}
                  existingPath={path}
                  setReplyingComment={setReplyingComment}
                  setCommentPath={setCommentPath}
                  key={comment.id}
                  comment={comment}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
