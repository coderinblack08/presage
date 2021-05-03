import {
  HomeIcon,
  CogIcon,
  SearchIcon,
  PencilAltIcon,
  MailIcon,
  PlusIcon,
  BookmarkIcon,
} from "@heroicons/react/solid";
import React from "react";
import { Avatar } from "../components/Avatar";
import { AvatarGroup } from "../components/AvatarGroup";
import { Navbar } from "../components/Navbar";
import { useScreen } from "../lib/useScreen";

const Layout: React.FC = ({ children }) => {
  const screenType = useScreen();

  let gridTemplateColumns = "2.5fr 5fr 3fr";

  if (screenType === "tablet") {
    gridTemplateColumns = ".75fr 8fr 3fr";
  } else if (screenType === "mobile") {
    gridTemplateColumns = "1fr 8fr";
  } else if (screenType === "fullscreen") {
    gridTemplateColumns = "1fr";
  }

  return (
    <div>
      <Navbar />
      <div
        className="grid gap-20 max-w-[98em] mx-auto py-12 lg:py-14 px-6"
        style={{ gridTemplateColumns }}
      >
        {screenType === "desktop" ? (
          <nav>
            <p className="font-bold small text-gray mb-3">NAVIGATION</p>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="block py-1.5 px-4 rounded-lg bg-darker-gray w-full"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-1.5 px-4 rounded-lg w-full text-light-gray"
                >
                  Explore
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-1.5 px-4 rounded-lg w-full text-light-gray"
                >
                  Messages
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-between py-1.5 px-4 rounded-lg w-full text-light-gray"
                >
                  Post Message
                  <PencilAltIcon className="w-4 h-4 text-gray" />
                </a>
              </li>
            </ul>
            <p className="font-bold small text-gray mb-3 mt-16">FOLLOWING</p>
            <ul className="space-y-6">
              <AvatarGroup username="jcornell" displayName="John Cornell" />
              <AvatarGroup
                username="coderinblack"
                displayName="Bovine Cattle"
              />
            </ul>
          </nav>
        ) : (
          screenType !== "fullscreen" && (
            <nav className="space-y-4">
              <a className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary">
                <HomeIcon className="w-6 h-6" />
              </a>
              <a className="flex items-center justify-center w-12 h-12 rounded-xl bg-darkest-gray">
                <SearchIcon className="w-6 h-6" />
              </a>
              <a className="flex items-center justify-center w-12 h-12 rounded-xl bg-darkest-gray">
                <MailIcon className="w-6 h-6" />
              </a>
              <a className="flex items-center justify-center w-12 h-12 rounded-xl bg-darkest-gray">
                <BookmarkIcon className="w-6 h-6" />
              </a>
              <a className="flex items-center justify-center w-12 h-12 rounded-xl bg-darkest-gray">
                <CogIcon className="w-6 h-6" />
              </a>
            </nav>
          )
        )}
        <main>{children}</main>
        {screenType !== "mobile" && screenType !== "fullscreen" ? (
          <aside
            className={`space-y-10 ${
              screenType === "tablet" ? "max-w-sm" : "max-w-md"
            }`}
          >
            <div>
              <p className="font-bold mb-2.5">Recommended Follows</p>
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2 flex-shrink-0">
                  <Avatar
                    className="inline-block ring-2 ring-black"
                    src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    displayName="John Smith"
                    size="sm"
                  />
                  <Avatar
                    className="inline-block ring-2 ring-black"
                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    displayName="John Smith"
                    size="sm"
                  />
                  <Avatar
                    className="inline-block ring-2 ring-black"
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                    displayName="John Smith"
                    size="sm"
                  />
                </div>
                <p className="text-light-gray">
                  Jack McDade, Honest Abe,{" "}
                  <span className="text-gray">and 3 more</span>
                </p>
              </div>
            </div>
            <div>
              <p className="font-bold mb-2.5">Topics Following</p>
              <div className="flex items-center space-x-2">
                <span className="small px-3.5 py-0.5 font-bold rounded-md bg-darker-gray">
                  WebDev
                </span>
                <span className="small px-3.5 py-0.5 font-bold rounded-md bg-darker-gray">
                  Politics
                </span>
                <span className="small px-3.5 py-0.5 font-bold rounded-md bg-darker-gray">
                  Mathematics
                </span>
                <button className="bg-primary p-1 rounded-full">
                  <PlusIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden divide-y divide-darker-gray">
              <header className="py-3.5 px-5 bg-darkest-gray">
                <h4>Trending Hashtags</h4>
              </header>
              <a href="#" className="block bg-[#171B27] px-5 py-3">
                <p className="text-primary font-medium">Politics · 2k posts</p>
                <p className="font-bold text-lg">#joinsession</p>
                <p className="small text-gray truncate">
                  President Joe Biden ate a shoe during his joint address
                </p>
              </a>
              <a href="#" className="block bg-[#171B27] px-5 py-3">
                <p className="text-primary font-medium">Politics · 2k posts</p>
                <p className="font-bold text-lg">#joinsession</p>
                <p className="small text-gray truncate">
                  President Joe Biden ate a shoe during his joint address
                </p>
              </a>
              <footer className="py-3.5 px-5 bg-darkest-gray">
                <a href="#" className="font-bold">
                  Show More →
                </a>
              </footer>
            </div>
          </aside>
        ) : null}
      </div>
    </div>
  );
};

export default Layout;
