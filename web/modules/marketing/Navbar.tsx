import React from "react";
import { PresageLogo } from "./PresageLogo";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <nav className="relative z-20 flex items-center justify-between max-w-7xl mx-auto px-5 lg:px-10 py-4">
      <PresageLogo />
      <ul className="flex items-center space-x-6">
        <li>
          <a className="text-gray-800">Explore</a>
        </li>
        <li>
          <a className="text-gray-800">Pricing</a>
        </li>
        <li>
          <a href="http://localhost:4000/auth/google" className="text-gray-800">
            Login
          </a>
        </li>
      </ul>
    </nav>
  );
};
