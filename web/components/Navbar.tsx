import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { MdArrowBack, MdSearch } from "react-icons/md";
import { useOnPath } from "../lib/onPath";
import { LoginModal } from "../modules/login/LoginModal";
import { useUser } from "../stores/user";
import { Input } from "./Input";
import { UserDropdown } from "./UserDropdown";

interface NavbarProps {}

const SearchBar: React.FC<{
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setShowSearch }) => {
  const searchRef = useRef<HTMLInputElement>();
  const router = useRouter();
  const [query, setQuery] = useState("");
  useEffect(() => searchRef.current.focus(), []);

  return (
    <div className="flex items-center space-x-4 max-w-xl w-full h-10">
      <button
        className="icon-button"
        onClick={() => setShowSearch(false)}
        children={
          <MdArrowBack className="w-6 h-6 text-light-gray hover:text-lighter-gray" />
        }
      />
      <form
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
          router.push({ pathname: "/search", query: { q: query } });
        }}
      >
        <Input
          placeholder="Search for soundbites, users, and topics"
          ref={searchRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Escape") {
              setShowSearch(false);
            }
          }}
          className="flex-grow"
        />
      </form>
    </div>
  );
};

export const Navbar: React.FC<NavbarProps> = () => {
  const onPath = useOnPath();
  const { user } = useUser();
  const [showSearch, setShowSearch] = useState(false);
  const activeClass = "text-faint-primary bg-primary bg-opacity-10 rounded-xl";

  return (
    <nav
      className={`${
        onPath("/u/[username]")
          ? ""
          : "backdrop-filter backdrop-blur-lg bg-black bg-opacity-75"
      } sticky z-40 top-0 flex items-center justify-between lg:max-w-7xl xl:max-w-8xl mx-auto p-6`}
    >
      <Link href="/">
        <a className="cursor-pointer flex-shrink-0">
          <img src="/static/logo.png" className="w-auto h-10" />
        </a>
      </Link>

      {showSearch ? (
        <SearchBar setShowSearch={setShowSearch} />
      ) : (
        <ul className="hidden lg:flex items-center space-x-5 h-10">
          <li>
            <Link href="/">
              <a
                className={`${
                  onPath(["/", "/bite/[id]"])
                    ? activeClass
                    : "text-light-gray hover:text-lighter-gray"
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
                  onPath("/explore")
                    ? activeClass
                    : "text-light-gray hover:text-lighter-gray"
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
                  onPath("/upload")
                    ? activeClass
                    : "text-light-gray hover:text-lighter-gray"
                } px-4 py-2`}
              >
                Upload
              </a>
            </Link>
          </li>
          <li>
            <button
              onClick={() => {
                setShowSearch(true);
              }}
              className="text-light-gray hover:text-lighter-gray flex items-center px-4 py-2 focus:outline-none font-medium"
            >
              <MdSearch className="w-5 h-5 mr-2" />
              Search
            </button>
          </li>
        </ul>
      )}
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
        {user ? <UserDropdown /> : <LoginModal />}
      </div>
    </nav>
  );
};
