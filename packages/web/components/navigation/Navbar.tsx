import React from "react";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { Button } from "../Button";
import { Logo } from "../other/Logo";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <nav className="relative z-20 flex items-center justify-between max-w-7xl mx-auto px-5 py-6 md:py-8">
      <Logo small />
      <div className="hidden md:flex items-center space-x-8">
        <ul className="flex items-center space-x-10">
          <li>
            <a>Explore</a>
          </li>
          <li>
            <a>Pricing</a>
          </li>
        </ul>
        <div className="h-6 w-[1px] bg-gray-300" />
        <div className="flex items-center space-x-4">
          <a href="https://instagram.com/joinpresage">
            <AiOutlineInstagram className="w-6 h-6" />
          </a>
          <a href="https://twitter.com/joinpresage">
            <AiOutlineTwitter className="w-6 h-6" />
          </a>
          <Button>Login</Button>
        </div>
      </div>
    </nav>
  );
};
