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
  article: Article;
}

export const ArticleNavbar: React.FC<ArticleNavbarProps> = ({ article }) => {
  const { data: me } = useQuery<User>("/me");

  return (
    <nav className="bg-gray-50 shadow-sm backdrop-blur-lg top-0">
      <div className="flex items-center justify-between max-w-4xl p-5 md:p-8 mx-auto">
        <Link href={`/u/${article.user.username}`}>
          <a className="flex items-center space-x-5">
            <div className="relative">
              <img
                src={article.journal.picture}
                alt={article.journal.name}
                className="w-[3.125rem] h-[3.125rem] rounded-2xl"
              />
              <img
                src={article.user.profilePicture}
                alt={article.user.displayName}
                className="absolute -bottom-1.5 -right-1.5 ring-2 ring-gray-100 w-7 h-7 rounded-full"
              />
            </div>
            <div className="-mb-2">
              <h4 className="text-lg sm:text-xl leading-normal">
                {article.user.displayName}&apos;s {article.journal.name}
              </h4>
              <p className="text-gray-500 small sm:text-sm mt-0.5">
                @{article.user.username}
              </p>
            </div>
          </a>
        </Link>
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
                  <span className="text-base font-bold">
                    0 <span className="text-gray-600">Points</span>
                  </span>
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