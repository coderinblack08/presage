import { Menu } from "@headlessui/react";
import Link from "next/link";
import router from "next/router";
import React from "react";
import { Discovery, TicketStar } from "react-iconly";
import { useQuery } from "react-query";
import { User, UserPoints } from "../lib/types";
import { Button } from "./Button";
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
  const { data: points } = useQuery<UserPoints>(`/articles/points/${user.id}`);

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
                  color="gray"
                  icon={
                    <div className="scale-80">
                      <TicketStar set="bulk" />
                    </div>
                  }
                >
                  <div className="text-base font-bold">
                    {points?.points || 0}{" "}
                    <span className="text-gray-600">
                      {points?.points === 1 ? "Point" : "Points"}
                    </span>
                  </div>
                </Button>
              </div>
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
