import { Menu } from "@headlessui/react";
import Link from "next/link";
import router from "next/router";
import React from "react";
import { Discovery, TicketStar } from "react-iconly";
import { useQuery } from "react-query";
import { Article, User } from "../lib/types";
import { Button } from "./Button";
import { Dropdown, MenuItem } from "./Dropdown";
import { NavLink } from "./Navbar";
import { UserDropdown } from "./UserDropdown";

interface ArticleNavbarProps {
  article?: Article;
  lightGray?: boolean;
  user?: User;
}

export const ArticleNavbar: React.FC<ArticleNavbarProps> = ({
  article,
  user,
  lightGray,
}) => {
  const { data: me } = useQuery<User>("/me");

  return (
    <nav className={lightGray ? "bg-gray-50" : "bg-gray-100"}>
      <div
        className={`flex items-center justify-between max-w-4xl ${
          article ? "py-6 md:py-8" : "py-4 md:py-5"
        } px-5 md:px-8 mx-auto`}
      >
        {article ? (
          <Link href={`/u/${article.user.username}`}>
            <a className="flex items-center space-x-4 sm:space-x-5">
              <div className="relative">
                <img
                  src={article.journal.picture}
                  alt={article.journal.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                />
                <img
                  src={article.user.profilePicture}
                  alt={article.user.displayName}
                  className="absolute -bottom-1 -right-1 sm:-bottom-1.5 sm:-right-1.5 ring-2 ring-gray-100 w-5 h-5 sm:w-6 sm:h-6 rounded-full"
                />
              </div>
              <div className="-mb-2">
                <h6 className="text-base md:text-lg lg:text-xl leading-normal font-bold">
                  {article.user.displayName}&apos;s {article.journal.name}
                </h6>
                <p className="text-gray-500 small md:text-sm mt-0.5">
                  @{article.user.username}
                </p>
              </div>
            </a>
          </Link>
        ) : null}
        {user ? (
          <Link href="/">
            <a className="flex items-center space-x-4">
              <div className="font-display text-black text-2xl font-bold">
                presage
              </div>
            </a>
          </Link>
        ) : null}
        <div className="flex items-center space-x-6 sm:hidden">
          <Dropdown
            opener={
              <Menu.Button className="focus:outline-none w-8 h-8 flex items-center justify-center">
                <svg
                  className="w-6 h-auto fill-current text-gray-800"
                  viewBox="0 0 24 12"
                >
                  <rect width="24" height="2"></rect>
                  <rect y="5" width="24" height="2"></rect>
                  <rect y="10" width="24" height="2"></rect>
                </svg>
              </Menu.Button>
            }
          >
            <MenuItem
              icon={
                <div className="scale-80">
                  <TicketStar set="bulk" />
                </div>
              }
            >
              <span className="text-base font-bold">
                0 <span className="text-gray-600">Points</span>
              </span>
            </MenuItem>
            <MenuItem
              onClick={() => router.push("/explore")}
              icon={
                <div className="scale-80">
                  <Discovery set="bulk" />
                </div>
              }
            >
              Explore
            </MenuItem>
          </Dropdown>
          {me ? <UserDropdown /> : null}
        </div>
        <div className="items-center space-x-8 lg:space-x-10 hidden sm:flex">
          <NavLink icon={<Discovery set="bulk" />} href="/explore">
            Explore
          </NavLink>
          {me ? (
            <div className="flex item-center space-x-4">
              <div className="flex items-center flex-grow-0">
                <Button
                  size="small"
                  color="white"
                  icon={
                    <div className="scale-80">
                      <TicketStar set="bulk" />
                    </div>
                  }
                >
                  <div className="text-base font-bold">
                    0 <span className="text-gray-600">Points</span>
                  </div>
                </Button>
              </div>
              <UserDropdown />
            </div>
          ) : (
            <a href="http://localhost:4000/auth/google">
              <Button rounded>Login</Button>
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};
