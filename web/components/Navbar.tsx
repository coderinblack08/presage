import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useUser } from "../stores/auth";
import { Button } from "./Button";
import { UserDropdown } from "./UserDropdown";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const router = useRouter();
  const { user } = useUser();
  const onPath = (tab: string) => tab === router.pathname;
  const activeClass = "text-faint-primary bg-primary bg-opacity-10 rounded-xl";

  return (
    <nav
      className="sticky z-50 top-0 bg-black bg-opacity-75 flex items-center justify-between max-w-[98em] mx-auto p-6"
      style={{
        opacity: 5,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      <Link href="/">
        <a className="cursor-pointer flex-shrink-0">
          <img src="/static/logo.png" className="w-auto h-10" />
        </a>
      </Link>
      <ul className="hidden lg:flex items-center space-x-4">
        <li>
          <Link href="/">
            <a
              className={`${
                onPath("/") ? activeClass : "text-light-gray"
              } px-4 py-2`}
            >
              Feed
            </a>
          </Link>
        </li>
        <li>
          <Link href="/social">
            <a
              className={`${
                onPath("/social") ? activeClass : "text-light-gray"
              } px-4 py-2`}
            >
              Social
            </a>
          </Link>
        </li>
        <li>
          <Link href="/publishers">
            <a
              className={`${
                onPath("/publishers") ? activeClass : "text-light-gray"
              } px-4 py-2`}
            >
              Publishers
            </a>
          </Link>
        </li>
        <li>
          <Link href="/pish">
            <a
              className={`${
                onPath("/pish") ? activeClass : "text-light-gray"
              } px-4 py-2`}
            >
              Pish
            </a>
          </Link>
        </li>
      </ul>
      <div className="flex items-center flex-shrink-0">
        <div className="flex items-center space-x-4 mr-6">
          <a href="https://github.com/coderinblack08/presage">
            <img src="/static/github.svg" className="w-6 h-6" />
          </a>
          <a href="https://twitter.com/coderinblack/status/1386457368574140416">
            <img src="/static/twitter.svg" className="w-6 h-6" />
          </a>
          <button>
            <img src="/static/notification.svg" className="w-6 h-6" />
          </button>
        </div>
        {user ? (
          <UserDropdown />
        ) : (
          <div className="space-x-2">
            <Link href="/login">
              <Button color="secondary">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
