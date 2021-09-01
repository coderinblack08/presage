import React from "react";
import { Sidepanel, SidepanelTrigger } from "../../../components/sidepanel";
import { Sidebar } from "./Sidebar";

interface SidebarPanelProps {}

export const SidebarPanel: React.FC<SidebarPanelProps> = ({}) => {
  return (
    <Sidepanel
      trigger={
        <SidepanelTrigger>
          <button className="flex items-center justify-center">
            <svg
              className="w-6 h-6 rotate-180"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6H20M8 12H20M4 18H20"
                stroke="#111827"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </SidepanelTrigger>
      }
    >
      <Sidebar />
    </Sidepanel>
  );
};
