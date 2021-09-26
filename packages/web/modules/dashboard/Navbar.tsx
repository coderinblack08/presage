import { getAuth, signOut } from "@firebase/auth";
import { IconSearch } from "@tabler/icons";
import Link from "next/link";
import React from "react";
import { Logo } from "../../components/branding/Logo";
import {
  Dropdown,
  DropdownItem,
  DropdownTrigger,
} from "../../components/dropdown";
import { Input } from "../../components/input";
import { ProfilePicture } from "../auth/ProfilePicture";
import { useUser } from "../auth/useUser";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const { user } = useUser();

  return (
    <nav className="flex items-center justify-between max-w-7xl mx-auto p-5">
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <div className="flex items-center space-x-4">
        <Input
          icon={<IconSearch className="w-5 h-5 text-gray-400" />}
          placeholder="Jump to..."
          shortcut="⌘K"
          outline
        />
        <Dropdown
          trigger={
            <DropdownTrigger className="flex-shrink-0 w-10 h-10">
              <button className="flex-shrink-0">
                <ProfilePicture user={user} className="w-10 h-10" />
              </button>
            </DropdownTrigger>
          }
          align="end"
          sideOffset={16}
        >
          <DropdownItem>Profile</DropdownItem>
          <DropdownItem onClick={async () => signOut(getAuth())}>
            Logout
          </DropdownItem>
        </Dropdown>
      </div>
    </nav>
  );
};
