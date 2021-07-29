import React from "react";
import { MdMenu } from "react-icons/md";
import shallow from "zustand/shallow";
import { Button } from "../../components/Button";
import { useSidebarOpen } from "./DraftSidebar";

interface OpenButtonProps {}

export const OpenButton: React.FC<OpenButtonProps> = ({}) => {
  const [open, setOpen] = useSidebarOpen((x) => [x.open, x.setOpen], shallow);

  return (
    <>
      {!open ? (
        <Button
          icon={<MdMenu className="w-6 h-6 text-gray-600" />}
          color="transparent"
          size="none"
          onClick={() => setOpen(true)}
        />
      ) : null}
    </>
  );
};
