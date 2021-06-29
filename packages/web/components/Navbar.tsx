import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Paper, TicketStar, Upload, Wallet } from "react-iconly";
import { useQuery } from "react-query";
import { User } from "../lib/types";
import logo from "../public/static/logo.png";
import { Button } from "./Button";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const { data: me } = useQuery<User>("/me");

  return (
    <nav className="max-w-8xl mx-auto flex items-center justify-between py-6 px-8">
      <Link href="/">
        <a className="flex items-center space-x-4">
          <Image src={logo} alt="Logo" />
          <h4 className="text-white">Presage</h4>
        </a>
      </Link>
      <div className="hidden md:flex items-center space-x-10 lg:space-x-12">
        <a className="flex items-center">
          <div className="mr-2 scale-80">
            <Paper set="bulk" />
          </div>
          Browse
        </a>
        <a className="flex items-center">
          <div className="mr-2 scale-80">
            <Wallet set="bulk" />
          </div>
          Pricing
        </a>
        <Link href="/publish">
          <a className="flex items-center">
            <div className="mr-2 scale-80">
              <Upload set="bulk" />
            </div>
            Publish
          </a>
        </Link>
        {me ? (
          <div className="flex item-center space-x-6">
            <div className="flex items-center flex-grow-0">
              <Button
                color="gray"
                size="small"
                icon={
                  <div className="scale-80">
                    <TicketStar set="bulk" />
                  </div>
                }
                className="bg-gray-600 border border-gray-500 hover:bg-gray-500"
              >
                <span className="text-base font-bold">
                  12 <span className="text-gray-200">Referrals</span>
                </span>
              </Button>
            </div>
            <img
              src={me.profilePicture}
              alt={me.displayName}
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
        ) : (
          <a href="http://localhost:4000/auth/google">
            <Button>Login</Button>
          </a>
        )}
      </div>
    </nav>
  );
};
