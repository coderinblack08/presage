import Link from "next/link";
import React from "react";
import { MdSearch } from "react-icons/md";
import { useOnPath } from "../lib/onPath";
import { LoginModal } from "../modules/login/LoginModal";
import { useUser } from "../stores/auth";
import { UserDropdown } from "./UserDropdown";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
  const onPath = useOnPath();
  const { user } = useUser();
  const activeClass = "text-faint-primary bg-primary bg-opacity-10 rounded-xl";

  return (
    <nav
      className={`sticky z-40 top-0 bg-black bg-opacity-75 flex items-center justify-between lg:max-w-7xl xl:max-w-8xl mx-auto p-6`}
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
      <ul className="hidden lg:flex items-center space-x-5">
        <li>
          <Link href="/">
            <a
              className={`${
                onPath(["/", "/bite/[id]"]) ? activeClass : "text-light-gray"
              } px-4 py-2`}
            >
              Feed
            </a>
          </Link>
        </li>
        <li>
          <Link href="/explore">
            <a
              className={`${
                onPath("/explore") ? activeClass : "text-light-gray"
              } px-4 py-2`}
            >
              Explore
            </a>
          </Link>
        </li>
        <li>
          <Link href="/upload">
            <a
              className={`${
                onPath("/upload") ? activeClass : "text-light-gray"
              } px-4 py-2`}
            >
              Upload
            </a>
          </Link>
        </li>
        <li>
          <Link href="/search">
            <button className="text-light-gray flex items-center px-4 py-2 focus:outline-none">
              <MdSearch className="w-5 h-5 mr-2" />
              Search
            </button>
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
          <button className="focus:outline-none">
            <img src="/static/notification.svg" className="w-6 h-6" />
          </button>
        </div>
        {user ? <UserDropdown /> : <LoginModal />}
      </div>
    </nav>
  );
};
