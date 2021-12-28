import React from "react";
import { Input } from "../../components/Input";
import { PresageLogo } from "../marketing/PresageLogo";
import { AccountDropdown } from "./AccountDropdown";
import { SidebarDraftList } from "./SidebarDraftList";
import { SidebarMenuLinks } from "./SidebarMenuLinks";

export const Sidebar: React.FC = () => {
  return (
    <nav className="flex flex-col bg-[#FAFAF9] w-[300px] h-screen border-r">
      <div className="h-full py-5 overflow-y-auto">
        <div className="px-3 space-y-2">
          <PresageLogo />
          <Input
            icon={
              <svg
                className="w-7 h-7 -ml-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.25 19.5449L15.5 15.7949L19.25 19.5449ZM4.75 11.2949C4.75 7.84314 7.54822 5.04492 11 5.04492C14.4518 5.04492 17.25 7.84314 17.25 11.2949C17.25 14.7467 14.4518 17.5449 11 17.5449C7.54822 17.5449 4.75 14.7467 4.75 11.2949Z"
                  stroke="#A3A3A3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            placeholder="Jump to..."
            shortcut="⌘K"
          />
        </div>
        <SidebarMenuLinks />
        <div className="px-3 py-5">
          <h2 className="font-bold px-4 text-sm mb-1.5">Drafts</h2>
          <SidebarDraftList />
        </div>
      </div>
      <AccountDropdown />
    </nav>
  );
};
