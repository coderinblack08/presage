import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { Button } from "../primatives/Button";
import { Logo } from "../other/Logo";
import { useMediaQuery } from "react-responsive";
import { Dropdown } from "../primatives/dropdown";
import { DropdownItem } from "../primatives/dropdown/DropdownItem";
import { DropdownDivider } from "../primatives/dropdown/DropdownDivider";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 640px)" });

  return (
    <nav className="relative z-20 flex items-center justify-between max-w-7xl mx-auto px-5 lg:px-10 py-6">
      <Logo small={isTabletOrMobile} />
      <Dropdown
        wrapperClassName="block md:hidden"
        trigger={
          <DropdownMenu.Trigger>
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6H20M8 12H20M4 18H20"
                stroke="#111827"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
            </svg>
          </DropdownMenu.Trigger>
        }
      >
        <DropdownItem>Explore</DropdownItem>
        <DropdownItem>Pricing</DropdownItem>
        <DropdownDivider />
        <DropdownItem>Twitter</DropdownItem>
        <DropdownItem>Instagram</DropdownItem>
        <DropdownDivider />
        <DropdownItem>Login</DropdownItem>
      </Dropdown>
      <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
        <ul className="flex items-center space-x-8 lg:space-x-10">
          <li>
            <a className="text-gray-800">Explore</a>
          </li>
          <li>
            <a className="text-gray-800">Pricing</a>
          </li>
        </ul>
        <div className="h-6 w-[1px] bg-gray-300" />
        <div className="flex items-center space-x-4">
          <a href="https://instagram.com/joinpresage">
            <AiOutlineInstagram className="w-6 h-6 text-gray-800" />
          </a>
          <a href="https://twitter.com/joinpresage">
            <AiOutlineTwitter className="w-6 h-6 text-gray-800" />
          </a>
        </div>
        <Button rounded>Login</Button>
      </div>
    </nav>
  );
};
