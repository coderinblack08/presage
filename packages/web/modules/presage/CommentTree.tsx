import React from "react";
import { TreePresage, User } from "../../types";
import { Comment } from "./Comment";

interface CommentTreeProps {
  comments: TreePresage[];
  nested?: boolean;
  parentUser?: User;
}

export const CommentTree: React.FC<CommentTreeProps> = ({
  comments,
  nested,
  parentUser,
}) => {
  return (
    <div className="space-y-10">
      {comments?.map((comment, i) => (
        <>
          <Comment
            key={comment.id}
            presage={comment}
            parentUser={parentUser}
            nested={
              (nested && i !== comments.length - 1) ||
              comment.children.length > 0
            }
          />
          {comment.children.length ? (
            <CommentTree
              comments={comment.children}
              parentUser={comment.user}
              nested
            />
          ) : null}
        </>
      ))}
    </div>
  );
};
