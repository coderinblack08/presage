import { useRouter } from "next/dist/client/router";
import React from "react";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { useMeQuery } from "../../generated/graphql";
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
        <DropdownItem href="http://localhost:4000/auth/google">
          Login
        </DropdownItem>
      </Dropdown>
      <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
        <ul className="flex items-center space-x-8">
          <li>
            <a className="text-gray-800">Explore</a>
          </li>
          <li>
            <a className="text-gray-800">Pricing</a>
          </li>
          {user?.me ? (
            <li>
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={user.me?.profilePicture || ""}
                alt={user?.me?.displayName}
              />
            </li>
          ) : (
            <li>
              <a
                href="http://localhost:4000/auth/google"
                className="text-gray-800"
              >
                Login
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
