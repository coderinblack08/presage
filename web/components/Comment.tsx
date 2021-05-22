import React from "react";
import { definitions } from "../types/supabase";
import { Avatar } from "./avatar/Avatar";

export const Comment: React.FC<
  definitions["comments"] & { profiles: definitions["profiles"] }
> = ({ body, profiles }) => {
  return (
    <div className="flex space-x-5">
      <Avatar displayName={profiles.username} />
      <div>
        <a href="#" className="font-bold">
          {profiles.displayName}{" "}
          <span className="text-gray ml-1">@{profiles.username}</span>
        </a>
        <p className="text-light-gray mt-1">{body}</p>
      </div>
    </div>
  );
};
