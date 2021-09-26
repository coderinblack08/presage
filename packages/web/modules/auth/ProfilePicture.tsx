import React from "react";
import { User } from "../../types";

interface ProfilePictureProps {
  className?: string;
  user: User | null;
}

export const ProfilePicture: React.FC<ProfilePictureProps> = ({
  className,
  user,
}) => {
  return (
    <img
      className={`w-8 h-8 rounded-full object-cover ${className}`}
      src={user?.profilePicture || "/static/default-picture.svg"}
      alt={user?.displayName}
    />
  );
};
