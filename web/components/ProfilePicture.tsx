import React from "react";
import { User } from "../lib/types";

interface ProfilePictureProps {
  className?: string;
  size?: "small" | "large";
  user: User | null;
}

export const ProfilePicture: React.FC<ProfilePictureProps> = ({
  className,
  size = "small",
  user,
}) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={`${
        size === "small" ? "w-8 h-8" : "w-12 h-12"
      } rounded-xl object-cover ${
        !user?.profilePicture ? "border shadow-sm" : ""
      } ${className}`}
      src={user?.profilePicture || "/static/default-picture.svg"}
      alt={user?.displayName}
    />
  );
};
