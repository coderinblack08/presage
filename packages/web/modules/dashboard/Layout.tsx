import React from "react";
import { HotKeys, KeyMap } from "react-hotkeys";
import { useMediaQuery } from "react-responsive";
import { useJumpToHandlers } from "./JumpTo";
import { Sidebar } from "./Sidebar";
import { SidebarPanel } from "./SidebarPanel";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const handler = useJumpToHandlers((x) => x.handler);
  const keyMap: KeyMap = {
    JUMP_TO: {
      name: "Focus Jump To Input",
      sequence: "command+k",
      action: "keydown",
    },
  };
  const handlers = {
    JUMP_TO: handler,
  };
  const hideSidebar = useMediaQuery({ query: "(max-width: 900px)" });

  return (
    <HotKeys keyMap={keyMap} handlers={handlers}>
      <div className="flex">
        {hideSidebar ? <SidebarPanel /> : <Sidebar />}
        <div className="w-full h-screen overflow-auto">{children}</div>
      </div>
    </HotKeys>
  );
};
