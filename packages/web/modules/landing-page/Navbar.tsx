import { Avatar, Menu, MenuDivider, MenuItem } from "@presage/ui";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import { User } from "../../lib/types";
import logo from "../../public/static/logo.svg";
import { LoginButton } from "./LoginButton";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const { data: me } = useQuery<User>("/auth/me");

  return (
    <nav className="relative z-20 flex items-center justify-between max-w-[88rem] mx-auto px-5 lg:px-10 py-6">
      <Image src={logo} alt="Presage Logo" />
      <div className="hidden sm:flex items-center space-x-6 lg:space-x-8">
        <ul className="flex items-center space-x-8">
          <li>
            <a className="text-gray-600">Explore</a>
          </li>
          <li>
            <a className="text-gray-600">Pricing</a>
          </li>
          {me ? (
            <li>
              <Menu
                align="end"
                trigger={
                  <button>
                    <Avatar src={me?.profilePicture!} name={me?.displayName!} />
                  </button>
                }
              >
                <MenuItem>Profile</MenuItem>
                <Link href="/dashboard" passHref>
                  <MenuItem>Dashboard</MenuItem>
                </Link>
                <MenuDivider />
                <MenuItem>Logout</MenuItem>
              </Menu>
            </li>
          ) : (
            <li>
              <LoginButton />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
