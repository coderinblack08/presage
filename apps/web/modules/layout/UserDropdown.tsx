import { signOut, useSession } from "next-auth/react";
import React from "react";
import { MdCode, MdCreditCard, MdHelp, MdLogout } from "react-icons/md";
import { Avatar, Menu, MenuDivider, MenuItem } from "ui";

export const UserDropdown: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <Menu
          side="right"
          alignOffset={8}
          trigger={
            <button className="flex items-center space-x-2 focus:outline-none p-5 border-t w-full text-left">
              <div className="flex items-center space-x-4 focus:outline-none">
                <Avatar
                  name={session.user.name!}
                  src={session.user.image!}
                  size="lg"
                  circle={false}
                />
                <div>
                  <h6 className="font-display font-bold text-lg leading-none">
                    {session?.user.name}
                  </h6>
                  <p className="text-gray-500 mt-1.5 text-sm">Free plan</p>
                </div>
              </div>
            </button>
          }
        >
          <MenuItem icon={<MdCreditCard size={20} />}>Upgrade</MenuItem>
          <MenuItem icon={<MdCode size={20} />}>Developer</MenuItem>
          <MenuItem icon={<MdHelp size={20} />}>Help Center</MenuItem>
          <MenuDivider />
          <MenuItem
            onClick={() => signOut({ callbackUrl: "/" })}
            icon={<MdLogout size={20} />}
          >
            Logout
          </MenuItem>
        </Menu>
      ) : null}
    </div>
  );
};
