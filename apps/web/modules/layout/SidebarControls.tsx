import { useAtom } from "jotai";
import { useKBar } from "kbar";
import React from "react";
import { MdMenu, MdSearch } from "react-icons/md";
import { Button } from "ui";
import { collapseAtom } from "../../lib/store";
import { useIsMounted } from "../../lib/useIsMounted";

interface SidebarControlsProps {}

export const SidebarControls: React.FC<SidebarControlsProps> = ({}) => {
  const { query } = useKBar();
  const isMounted = useIsMounted();
  const [collapsed, setCollapsed] = useAtom(collapseAtom);

  return (
    <div className="flex items-center space-x-2">
      <Button
        size="sm"
        variant="ghost"
        icon={<MdMenu size={18} />}
        onClick={() => setCollapsed(!collapsed)}
      />
      <Button
        size="sm"
        variant="ghost"
        icon={<MdSearch size={18} />}
        onClick={query.toggle}
      />
    </div>
  );
};
