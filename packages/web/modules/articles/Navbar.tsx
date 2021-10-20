import Link from "next/link";
import { login } from "../authentication/authenticate";
import React from "react";
import { Logo } from "../../components/branding/Logo";
import {
  Dropdown,
  DropdownDivider,
  DropdownItem,
  DropdownTrigger,
} from "../../components/dropdown";
import { useScreen } from "../../lib/hooks/useScreen";
import { useUser } from "../authentication/useUser";
import { logout } from "../authentication/logout";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const { isSmallerThanTablet } = useScreen();
  const { uid } = useUser();

  return (
    <nav className="flex items-center justify-between py-6 px-5 max-w-4xl mx-auto w-full">
      <Link href="/" passHref>
        <a>
          <Logo small={isSmallerThanTablet} />
        </a>
      </Link>
      <Dropdown
        trigger={
          <DropdownTrigger>
            <button>
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
            </button>
          </DropdownTrigger>
        }
        align="end"
      >
        <Link href="/explore" passHref>
          <DropdownItem>Explore</DropdownItem>
        </Link>
        <Link href="/dashboard" passHref>
          <DropdownItem>Publish</DropdownItem>
        </Link>
        <DropdownDivider />
        {uid ? (
          <>
            <DropdownItem>Profile</DropdownItem>
            <DropdownItem onClick={logout}>Logout</DropdownItem>
          </>
        ) : (
          <DropdownItem onClick={login}>Login</DropdownItem>
        )}
      </Dropdown>
    </nav>
  );
};
