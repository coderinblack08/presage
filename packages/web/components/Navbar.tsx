import React from "react";
import Link from "next/link";
import { MdSearch } from "react-icons/md";
import { Button } from "./Button";
import { useQuery } from "react-query";
import { User } from "../lib/types";
import { UploadModal } from "../modules/upload/UploadModal";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const { data: me } = useQuery<User>("/auth/me");

  return (
    <nav className="max-w-7xl mx-auto flex items-center justify-between py-6 px-8">
      <Link href="/">
        <a className="flex items-center space-x-4">
          <img src="http://localhost:3000/static/logo.png" alt="Logo" />
          <h4 className="text-white">Presage</h4>
        </a>
      </Link>
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
          <UploadModal />
          <img
            className="w-12 h-12 rounded-full"
            src={me.profilePicture}
            alt={me.displayName}
          />
        </div>
      ) : (
        <a href="http://localhost:4000/auth/google">
          <Button color="gray">Login</Button>
        </a>
      )}
    </nav>
  );
};
