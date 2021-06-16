import React from "react";
import { MdSearch } from "react-icons/md";
import { Button } from "./Button";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <nav className="max-w-7xl mx-auto flex items-center justify-between py-6 px-8">
      <div className="flex items-center space-x-4">
        <img src="http://localhost:3000/static/logo.png" alt="Logo" />
        <h4 className="text-white">Presage</h4>
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
      <a href="http://localhost:4000/auth/google">
        <Button color="gray">Login</Button>
      </a>
    </nav>
  );
};
