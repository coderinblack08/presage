import React from "react";
import { HotKeys, KeyMap } from "react-hotkeys";
import { useJumpToHandlers } from "./sidebar/JumpTo";
import { ResponsiveSidebar } from "./sidebar/ResponsiveSidebar";

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

  return (
    <HotKeys keyMap={keyMap} handlers={handlers}>
      <div className="flex">
        <ResponsiveSidebar />
        <div className="w-full h-screen overflow-auto">{children}</div>
      </div>
    </HotKeys>
  );
};
