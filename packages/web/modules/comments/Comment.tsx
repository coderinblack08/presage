import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import shallow from "zustand/shallow";
import { Comment as IComment } from "../../types";
import { ProfilePicture } from "../authentication/ProfilePicture";
import { useMutationEventStore } from "./useMutationEventStore";

interface CommentProps {
  comment: IComment;
  existingPath: string;
  articleId: string;
  setCommentPath: React.Dispatch<React.SetStateAction<string>>;
  setReplyingComment: React.Dispatch<React.SetStateAction<IComment | null>>;
}

export const Comment: React.FC<CommentProps> = ({
  comment,
  setCommentPath,
  setReplyingComment,
  existingPath,
  articleId,
}) => {
  const path = useMemo(() => `${existingPath}/${comment.id}/comments`, [
    comment.id,
    existingPath,
  ]);
  const [showReplies, setShowReplies] = useState(false);
  const [hasEvent, removeEvent] = useMutationEventStore(
    (x) => [x.has, x.remove],
    shallow
  );
  const { data: comments, refetch } = useQuery<IComment[]>(
    `/api/comments?path=${path}`,
    { enabled: showReplies }
  );

  useEffect(() => {
    if (!showReplies && comments && hasEvent(path)) {
      refetch();
      setShowReplies(true);
      removeEvent(path);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showReplies, JSON.stringify(comments)]);

  return (
    <div>
      <div className="flex space-x-5">
        <div className="flex flex-col items-center">
          <ProfilePicture user={comment.user} size="large" />
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
