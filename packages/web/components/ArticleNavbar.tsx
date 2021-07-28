import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import { User } from "../lib/types";
import { ClaimReward } from "../modules/article/ClaimReward";
import { LoginButton } from "./LoginButton";
import { UserDropdown } from "./UserDropdown";

interface ArticleNavbarProps {
  lightGray?: boolean;
  user: User;
}

export const ArticleNavbar: React.FC<ArticleNavbarProps> = ({
  lightGray,
  user,
}) => {
  const { data: me } = useQuery<User>("/me");

  return (
    <nav className={lightGray ? "bg-white" : "bg-gray-100"}>
      <div
        className={`flex items-center justify-between max-w-4xl py-4 md:py-5 px-5 md:px-8 mx-auto`}
      >
        <Link href="/explore">
          <a className="flex items-center space-x-4">
            <div className="font-display text-black text-2xl font-bold">
              presage
            </div>
          </a>
        </Link>
        <div className="flex items-center space-x-6 md:space-x-8">
          {me ? (
            <div className="flex item-center space-x-4">
              <ClaimReward user={user} />
              <UserDropdown showPublish />
            </div>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </nav>
  );
};
