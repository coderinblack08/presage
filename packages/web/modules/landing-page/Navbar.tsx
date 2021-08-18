import { useRouter } from "next/dist/client/router";
import React from "react";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { useMeQuery } from "../../src/generated/graphql";
import { Button } from "../../components/button";
import {
  Dropdown,
  DropdownDivider,
  DropdownItem,
  DropdownTrigger,
} from "../../components/dropdown";
import { Logo } from "../../components/branding/Logo";
import { useScreen } from "../../lib/useScreen";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const { isSmallerThanTablet } = useScreen();
  const [{ data: user }] = useMeQuery();
  const router = useRouter();

  return (
    <nav className="relative z-20 flex items-center justify-between max-w-7xl mx-auto px-5 lg:px-10 py-6">
      <Logo small={isSmallerThanTablet} />
      <Dropdown
        align="start"
        className="block md:hidden"
        trigger={
          <DropdownTrigger className="block md:hidden">
            <Button size="none" color="transparent">
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
        <DropdownItem>Twitter</DropdownItem>
        <DropdownItem>Instagram</DropdownItem>
        <DropdownDivider />
        <DropdownItem href="http://localhost:4000/auth/google">
          Login
        </DropdownItem>
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
        <div className="flex items-center space-x-5">
          <a href="https://instagram.com/joinpresage">
            <AiOutlineInstagram className="w-6 h-6 text-gray-800" />
          </a>
          <a href="https://twitter.com/joinpresage">
            <AiOutlineTwitter className="w-6 h-6 text-gray-800" />
          </a>
        </div>
        {user?.me ? (
          <div>
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={user.me?.profilePicture || ""}
              alt={user?.me?.displayName}
            />
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