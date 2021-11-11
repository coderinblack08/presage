import React from "react";
import Image from "next/image";
import logo from "../../public/static/logo.svg";
import { Button } from "@presage/ui";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <nav className="relative z-20 flex items-center justify-between max-w-7xl mx-auto px-5 lg:px-10 py-6">
      <Image src={logo} alt="Presage Logo" />
      <div className="hidden sm:flex items-center space-x-6 lg:space-x-8">
        <ul className="flex items-center space-x-8">
          <li>
            <a className="text-gray-300">Explore</a>
          </li>
          <li>
            <a className="text-gray-300">Pricing</a>
          </li>
          <li>
            <Button
              size="sm"
              color="secondary"
              variant="outline"
              className="text-gray-300"
            >
              Login
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
