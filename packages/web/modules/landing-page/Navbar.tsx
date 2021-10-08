import React from "react";
import { Logo } from "../../components/branding/Logo";
import { Button } from "../../components/button";
import {
  Dropdown,
  DropdownDivider,
  DropdownItem,
  DropdownTrigger,
} from "../../components/dropdown";
import { useScreen } from "../../lib/hooks/useScreen";
import { login } from "../auth/authenticate";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const { isSmallerThanTablet } = useScreen();

  return (
    <nav className="relative z-20 flex items-center justify-between max-w-7xl mx-auto px-5 lg:px-10 py-6">
      <Logo small={isSmallerThanTablet} />
      <Dropdown
        align="start"
        className="block md:hidden"
        trigger={
          <DropdownTrigger className="block md:hidden">
            <Button shadow={false} size="none" color="transparent">
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
            </Button>
          </DropdownTrigger>
        }
      >
        <DropdownItem>Explore</DropdownItem>
        <DropdownItem>Pricing</DropdownItem>
        <DropdownDivider />
        <DropdownItem href="https://twitter.com/joinpresage">
          Twitter
        </DropdownItem>
        <DropdownItem href="https://instagram.com/joinpresage">
          Instagram
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem onClick={login}>Login</DropdownItem>
      </Dropdown>
      <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
        <ul className="flex items-center space-x-8">
          <li>
            <a className="text-gray-800">Explore</a>
          </li>
          <li>
            <a className="text-gray-800">Pricing</a>
          </li>
          <li>
            <button onClick={login} className="text-gray-800">
              Login
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
