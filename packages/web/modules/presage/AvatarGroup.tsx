import Link from "next/link";
import React from "react";
import { User } from "../../types";

interface AvatarGroupProps {
  user: User;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({ user }) => {
  return (
    <Link href="/user/[username]" as={`/user/${user.username}`}>
      <a className="flex items-center space-x-5">
        <img
          className="w-14 h-14 rounded-full"
          src={user.profilePicture}
          alt={user.displayName}
        />
        <div>
          <p className="font-bold text-lg">{user.displayName}</p>
          <p className="text-gray-300">@{user.username}</p>
        </div>
      </a>
    </Link>
  );
};
