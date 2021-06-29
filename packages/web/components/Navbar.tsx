import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Paper, Upload, Wallet } from "react-iconly";
import logo from "../public/static/logo.png";
import { Button } from "./Button";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <nav className="max-w-8xl mx-auto flex items-center justify-between py-6 px-8">
      <Link href="/">
        <a className="flex items-center space-x-4">
          <Image src={logo} alt="Logo" />
          <h4 className="text-white">Presage</h4>
        </a>
      </Link>
      <div className="hidden md:flex items-center space-x-14">
        <a className="flex items-center">
          <div className="mr-3">
            <Paper set="bulk" />
          </div>
          Browse
        </a>
        <a className="flex items-center">
          <div className="mr-3">
            <Wallet set="bulk" />
          </div>
          Pricing
        </a>
        <a className="flex items-center">
          <div className="mr-3">
            <Upload set="bulk" />
          </div>
          Upload
        </a>
        <Button>Login</Button>
      </div>
    </nav>
  );
};
