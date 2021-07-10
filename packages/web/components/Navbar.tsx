import { Menu } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Call, Discovery, TicketStar, Upload, Wallet } from "react-iconly";
import { useQuery } from "react-query";
import { User } from "../lib/types";
import { Button } from "./Button";
import { Dropdown, MenuItem } from "./Dropdown";
import { UserDropdown } from "./UserDropdown";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const { data: me } = useQuery<User>("/me");
  const router = useRouter();

  return (
    <nav className="sticky z-50 bg-gray-100/75 backdrop-blur-lg top-0 max-w-8xl mx-auto flex items-center justify-between p-5 md:px-8 md:py-6">
      <Link href="/">
        <a className="flex items-center space-x-4">
          <div className="font-display text-black text-2xl font-bold">
            presage
          </div>
        </a>
      </Link>
      <div className="flex items-center space-x-6 md:hidden">
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
        {me ? <UserDropdown /> : null}
      </div>
      <div className="hidden md:flex items-center space-x-10 lg:space-x-12">
        <a className="flex items-center text-gray-800">
          <div className="mr-2 scale-80">
            <Discovery set="bulk" />
          </div>
          Explore
        </a>
        <a className="flex items-center text-gray-800">
          <div className="mr-2 scale-80">
            <Wallet set="bulk" />
          </div>
          Pricing
        </a>
        {me ? (
          <Link href="/publish">
            <a className="flex items-center text-gray-800">
              <div className="mr-2 scale-80">
                <Upload set="bulk" />
              </div>
              Publish
            </a>
          </Link>
        ) : (
          <Link href="/contact">
            <a className="flex items-center text-gray-800">
              <div className="mr-2 scale-80">
                <Call set="bulk" />
              </div>
              Contact
            </a>
          </Link>
        )}
        {me ? (
          <div className="flex item-center space-x-6">
            <div className="flex items-center flex-grow-0">
              <Button
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
            <UserDropdown />
          </div>
        ) : (
          <a href="http://localhost:4000/auth/google">
            <Button rounded>Login</Button>
          </a>
        )}
      </div>
    </nav>
  );
};
