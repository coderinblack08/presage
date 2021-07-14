import React from "react";
import { User } from "../lib/types";

interface AvatarProps {
  user: User;
}

export const Avatar: React.FC<AvatarProps> = ({ user }) => {
  return (
    <img
      src={user.profilePicture}
      alt={user.displayName}
      className="w-10 h-10 rounded-full object-cover"
    />
  );
};
