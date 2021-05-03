import {
  PencilAltIcon,
  HomeIcon,
  SearchIcon,
  MailIcon,
  BookmarkIcon,
  CogIcon,
} from "@heroicons/react/solid";
import React from "react";
import { AvatarGroup } from "../components/AvatarGroup";
import { useScreen } from "../lib/useScreen";

interface LeftSideBarProps {}

export const LeftSideBar: React.FC<LeftSideBarProps> = ({}) => {
  const screenType = useScreen();

  if (screenType === "desktop") {
    return (
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
          <AvatarGroup username="coderinblack" displayName="Bovine Cattle" />
        </ul>
      </nav>
    );
  }

  if (screenType !== "fullscreen") {
    return (
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
    );
  }

  return null;
};
