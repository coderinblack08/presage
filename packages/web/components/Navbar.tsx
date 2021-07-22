import { Menu } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Call, Discovery, TicketStar, Upload, Wallet } from "react-iconly";
import { useQuery } from "react-query";
import { User } from "../lib/types";
import { Button } from "./Button";
import { DraftNavbar } from "./DraftNavbar";
import { Dropdown, MenuItem } from "./Dropdown";
import { UserDropdown } from "./UserDropdown";

interface NavbarProps {
  isDraft?: boolean;
}

export const NavLink: React.FC<{ icon: React.ReactNode; href: string }> = ({
  href,
  children,
  icon,
}) => {
  return (
    <Link href={href} passHref>
      <a className="flex items-center text-gray-800">
        <div className="mr-2 scale-80">{icon}</div>
        {children}
      </a>
    </Link>
  );
};

export const Navbar: React.FC<NavbarProps> = ({ isDraft = false }) => {
  const { data: me } = useQuery<User>("/me");
  const router = useRouter();

  const normalNavbar = (
    <>
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
            onClick={() => router.push("/explore")}
            icon={
              <div className="scale-80">
                <Discovery set="bulk" />
              </div>
            }
          >
            Explore
          </MenuItem>
          <MenuItem
            icon={
              <div className="scale-80">
                <Wallet set="bulk" />
              </div>
            }
          >
            Pricing
          </MenuItem>
          {me ? (
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
          ) : (
            <MenuItem
              icon={
                <div className="scale-80">
                  <Call set="bulk" />
                </div>
              }
            >
              Contact
            </MenuItem>
          )}
        </Dropdown>
        {me ? <UserDropdown /> : null}
      </div>
      <div className="hidden md:flex items-center space-x-10 lg:space-x-12">
        <NavLink icon={<Discovery set="bulk" />} href="/explore">
          Explore
        </NavLink>
        <NavLink icon={<Wallet set="bulk" />} href="/pricing">
          Pricing
        </NavLink>
        {me ? (
          <NavLink icon={<Upload set="bulk" />} href="/publish">
            Publish
          </NavLink>
        ) : (
          <a
            href="mailto:help@joinpresage.com"
            className="flex items-center text-gray-800"
          >
            <div className="mr-2 scale-80">
              <Call set="bulk" />
            </div>
            Contact
          </a>
        )}
        {me ? (
          <UserDropdown />
        ) : (
          <a href="http://localhost:4000/auth/google">
            <Button rounded>Login</Button>
          </a>
        )}
      </div>
    </>
  );

  return (
    <nav className="sticky z-50 bg-gray-100/75 backdrop-blur-lg top-0">
      <div className="max-w-8xl py-4 px-5 md:px-8 md:py-5 mx-auto flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center space-x-4">
            <div className="font-display text-black text-2xl font-bold">
              presage
            </div>
          </a>
        </Link>
        {isDraft ? (
          <DraftNavbar id={router.query.id as string} />
        ) : (
          normalNavbar
        )}
      </div>
    </nav>
  );
};
