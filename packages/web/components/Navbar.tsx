import { Menu } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { MdMenu, MdSearch } from "react-icons/md";
import { useQuery, useQueryClient } from "react-query";
import { useTokenStore } from "../store/useTokenStore";
import { User } from "../types";
import { Button } from "./Button";
import { Dropdown, DropdownItem } from "./Dropdown";
import { Logo } from "./Logo";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const { data: me } = useQuery<User>("/api/me");
  const queryClient = useQueryClient();
  const router = useRouter();

  return (
    <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
      <div className="flex items-center">
        <button className="block md:hidden mr-6 md:mr-0">
          <MdMenu className="w-8 h-8" />
        </button>
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
      </div>
      <ul className="hidden md:flex items-center space-x-12">
        <li>
          <a href="#">Feed</a>
        </li>
        <li>
          <a href="#">Library</a>
        </li>
        <li className="flex items-center space-x-2">
          <MdSearch className="w-5 h-5" />
          <a href="#">Search</a>
        </li>
      </ul>
      {me ? (
        <div className="flex items-center space-x-6">
          <Link href="/upload">
            <Button color="gray">Upload</Button>
          </Link>
          <Dropdown
            openButton={
              <Menu.Button className="focus:outline-none">
                <img
                  src={me.profilePicture}
                  alt={me.displayName}
                  className="w-12 h-12 rounded-full"
                />
              </Menu.Button>
            }
          >
            <DropdownItem
              onClick={() =>
                router.push("/user/[username]", `/user/${me.username}`)
              }
            >
              Profile
            </DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem
              onClick={() => {
                useTokenStore
                  .getState()
                  .setTokens({ accessToken: "", refreshToken: "" });
                queryClient.setQueryData<User>("/api/me", null);
              }}
            >
              Logout
            </DropdownItem>
          </Dropdown>
        </div>
      ) : (
        <a href="http://localhost:4000/api/auth/google">
          <Button color="gray">Login</Button>
        </a>
      )}
    </nav>
  );
};
