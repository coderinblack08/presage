import { formatDistanceToNowStrict } from "date-fns";
import React from "react";
import { TreePresage, User } from "../../types";

interface CommentProps {
  presage: TreePresage;
  nested?: boolean;
  parentUser?: User;
}

export const Comment: React.FC<CommentProps> = ({
  presage,
  parentUser,
  nested,
}) => {
  return (
    <article className="relative">
      <div className="flex space-x-4">
        <img
          src={presage.user.profilePicture}
          alt={presage.user.displayName}
          className="relative z-10 w-8 h-8 rounded-full"
        />
        {nested ? (
          <div className="absolute top-0 bg-gray-700 w-[1px] h-[calc(100%+35px)]" />
        ) : null}
        <div>
          <h6 className="font-bold">
            {presage.user.displayName} ·{" "}
            <span className="text-gray-300">
              {formatDistanceToNowStrict(new Date(presage.createdAt))}
            </span>
          </h6>
          {parentUser ? (
            <p className="text-gray-300 mb-1">
              Replying to{" "}
              <span className="text-primary">{parentUser.displayName}</span>
            </p>
          ) : null}
          <p className="mt-0.5">{presage.content}</p>
          {/* <CommentModal presage={presage} /> */}
        </div>
      </div>
    </article>
  );
};
