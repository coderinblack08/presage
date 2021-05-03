import React from "react";
import { Avatar } from "./Avatar";

interface AvatarGroupProps {
  username: string;
  displayName: string;
  profilePicture?: string;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  username,
  displayName,
  profilePicture,
}) => {
  return (
    <div className="flex items-center space-x-4">
      <Avatar displayName={displayName} src={profilePicture} size="lg" />
      <div>
        <p className="font-bold">{displayName}</p>
        <span className="text-gray small">@{username}</span>
      </div>
    </div>
  );
};
