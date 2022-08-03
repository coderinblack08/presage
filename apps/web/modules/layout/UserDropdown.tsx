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
          className="text-[13px]"
          trigger={
            <button className="flex items-center space-x-2 focus:outline-none p-5 border-t dark:border-gray-800 w-full text-left text-[13px]">
              <div className="flex items-center space-x-4 focus:outline-none">
                <Avatar
                  name={session.user.name!}
                  src={session.user.image!}
                  size="lg"
                  circle={false}
                />
                <div>
                  <h6 className="font-display font-bold text-base leading-none truncate dark:text-white">
                    {session?.user.name}
                  </h6>
                  <p className="text-gray-500 mt-1.5 truncate">Free plan</p>
                </div>
              </div>
            </button>
          }
        >
          <MenuItem icon={<MdCreditCard size={18} />}>Upgrade</MenuItem>
          <MenuItem icon={<MdCode size={18} />}>Developer</MenuItem>
          <MenuItem icon={<MdHelp size={18} />}>Help Center</MenuItem>
          <MenuDivider />
          {/* <div className="px-4 text-gray-500 py-2">
            <h3 className="font-semibold mb-2">Quotas:</h3>
            <ul className="space-y-2">
              <li>0 / 100 drafts</li>
              <li>0 / 1GB storage</li>
              <li>0 / 3 rewards</li>
            </ul>
          </div>
          <MenuDivider /> */}
          <MenuItem
            onClick={() => signOut({ callbackUrl: "/" })}
            icon={<MdLogout size={18} />}
          >
            Logout
          </MenuItem>
        </Menu>
      ) : null}
    </div>
  );
};
