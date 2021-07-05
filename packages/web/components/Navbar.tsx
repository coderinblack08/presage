import { Menu } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Logout, TicketStar, Upload, Wallet } from "react-iconly";
import { useQuery, useQueryClient } from "react-query";
import { User } from "../lib/types";
import { SearchBar } from "../modules/navbar/Search";
import logo from "../public/static/logo.png";
import { Avatar } from "./Avatar";
import { Button } from "./Button";
import { Dropdown, MenuItem } from "./Dropdown";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const { data: me } = useQuery<User>("/me");
  const router = useRouter();
  const queryClient = useQueryClient();

  const userDropdown = (
    <>
      {me ? (
        <Dropdown
          opener={
            <Menu.Button>
              <Avatar user={me} />
            </Menu.Button>
          }
        >
          <MenuItem
            onClick={() => {
              localStorage.removeItem("access-token");
              queryClient.clear();
              router.push("/");
            }}
            icon={
              <div className="scale-80">
                <Logout set="bulk" />
              </div>
            }
          >
            Logout
          </MenuItem>
        </Dropdown>
      ) : null}
    </>
  );

  return (
    <nav className="sticky z-50 top-0 bg-gray-700/80 backdrop-blur-lg max-w-8xl mx-auto flex items-center justify-between py-6 px-8">
      <Link href="/">
        <a className="flex items-center space-x-4">
          <Image src={logo} alt="Logo" />
          <h4 className="text-white">Presage</h4>
        </a>
      </Link>
      <div className="flex items-center space-x-6 md:hidden">
        <SearchBar />
        <Dropdown
          opener={
            <Menu.Button className="focus:outline-none w-8 h-8 flex items-center justify-center">
              <svg
                className="w-6 h-auto fill-current text-white"
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
                <Wallet set="bulk" />
              </div>
            }
          >
            Pricing
          </MenuItem>
          <MenuItem
            onClick={() => router.push("/publish")}
            icon={
              <div className="scale-80">
                <Upload set="bulk" />
              </div>
            }
          >
            Publish
          </MenuItem>
        </Dropdown>
        {userDropdown}
      </div>
      <div className="hidden md:flex items-center space-x-10 lg:space-x-12">
        <SearchBar />
        <a className="flex items-center">
          <div className="mr-2 scale-80">
            <Wallet set="bulk" />
          </div>
          Pricing
        </a>
        <Link href="/publish">
          <a className="flex items-center">
            <div className="mr-2 scale-80">
              <Upload set="bulk" />
            </div>
            Publish
          </a>
        </Link>
        {me ? (
          <div className="flex item-center space-x-6">
            <div className="flex items-center flex-grow-0">
              <Button
                color="darkGray"
                size="small"
                icon={
                  <div className="scale-80">
                    <TicketStar set="bulk" />
                  </div>
                }
              >
                <span className="text-base font-bold">
                  0 <span className="text-gray-200">Referrals</span>
                </span>
              </Button>
            </div>
            {userDropdown}
          </div>
        ) : (
          <a href="http://localhost:4000/auth/google">
            <Button>Login</Button>
          </a>
        )}
      </div>
    </nav>
  );
};
