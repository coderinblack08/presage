import { Menu } from "@headlessui/react";
import Link from "next/link";
import router from "next/router";
import React from "react";
import { Discovery } from "react-iconly";
import { useQuery } from "react-query";
import { User } from "../lib/types";
import { ClaimReward } from "../modules/article/ClaimReward";
import { Dropdown, MenuItem } from "./Dropdown";
import { LoginButton } from "./LoginButton";
import { NavLink } from "./Navbar";
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
        <Link href="/">
          <a className="flex items-center space-x-4">
            <div className="font-display text-black text-2xl font-bold">
              presage
            </div>
          </a>
        </Link>
        <div className="flex items-center space-x-6 md:space-x-8 lg:space-x-10">
          <NavLink
            icon={
              <div className="hidden md:block">
                <Discovery set="bulk" />
              </div>
            }
            href="/explore"
          >
            Explore
          </NavLink>
          {me ? (
            <div className="flex item-center space-x-4">
              <ClaimReward user={user} />
              <UserDropdown />
            </div>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </nav>
  );
};
