import React from "react";
import { MdMoreHoriz } from "react-icons/md";
import { definitions } from "../types/supabase";
import { Avatar } from "./avatar/Avatar";

export const Comment: React.FC<
  definitions["comments"] & { profiles: definitions["profiles"] }
> = ({ body, profiles }) => {
  return (
    <div className="flex space-x-5 w-full">
      <Avatar displayName={profiles.username} />
      <div className="w-full">
        <div className="flex justify-between items-center">
          <a href="#" className="font-bold">
            {profiles.displayName}{" "}
            <span className="text-gray ml-1">@{profiles.username}</span>
          </a>
          <button className="icon-button">
            <MdMoreHoriz className="w-6 h-6 text-light-gray" />
          </button>
        </div>
        <p className="text-light-gray mt-1">{body}</p>
      </div>
    </div>
  );
};
