import React from "react";
import { User } from "../lib/types";

interface AvatarProps {
  user: User;
  small?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({ user, small }) => {
  return (
    <img
      src={user.profilePicture}
      alt={user.displayName}
      className={`${small ? "w-8 h-8" : "w-10 h-10"} rounded-full object-cover`}
    />
  );
};
