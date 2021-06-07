import React from "react";
import Link from "next/link";
import { MdSearch } from "react-icons/md";
import { useQuery } from "react-query";
import { User } from "../types";
import { Button } from "./Button";
import { Logo } from "./Logo";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const { data: me } = useQuery<User>("/api/me");

  return (
    <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <ul className="flex items-center space-x-12">
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
        <div className="flex items-center space-x-5">
          <Button color="gray">Upload</Button>
          <img
            src={me.profilePicture}
            alt={me.displayName}
            className="w-12 h-12 rounded-full"
          />
        </div>
      ) : (
        <a href="http://localhost:4000/api/auth/google">
          <Button color="gray">Login</Button>
        </a>
      )}
    </nav>
  );
};
