import { useAtom } from "jotai";
import React from "react";
import { MdMenu, MdSearch } from "react-icons/md";
import { collapseAtom } from "../../lib/store";

interface SidebarControlsProps {}

export const SidebarControls: React.FC<SidebarControlsProps> = ({}) => {
  const [collapsed, setCollapsed] = useAtom(collapseAtom);

  return (
    <div className="flex items-center text-gray-400 space-x-2">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-1 rounded-lg hover:bg-gray-100"
      >
        <MdMenu size={18} />
      </button>
      <button className="p-1 rounded-lg hover:bg-gray-100">
        <MdSearch size={18} />
      </button>
    </div>
  );
};
