import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "ui";
import logo from "../../public/static/logo.svg";
import { LoginModal } from "../authentication/LoginModal";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const { data: session } = useSession();

  return (
    <nav className="relative z-20 flex items-center justify-between max-w-7xl mx-auto px-5 lg:px-10 py-6">
      <Image src={logo} alt="Presage Logo" />
      <div className="hidden sm:flex items-center space-x-6 lg:space-x-8">
        <ul className="flex items-center space-x-6">
          <li>
            <a className="text-gray-600">Explore</a>
          </li>
          <li>
            <a className="text-gray-600">Pricing</a>
          </li>
          {session ? (
            <li>
              <Link href="/dashboard" passHref>
                <Button
                  size="sm"
                  variant="light"
                  className="bg-gray-200"
                  as="a"
                >
                  Go to dashboard
                </Button>
              </Link>
            </li>
          ) : (
            <li>
              <LoginModal />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
