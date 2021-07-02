import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, ReactNode } from "react";

interface DropdownProps {
  opener: ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({ opener, children }) => {
  return (
    <Menu as="div" className="relative z-50 inline-block text-left">
      <div className="flex items-center">{opener}</div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-4 w-56 rounded-lg bg-gray-600/75 backdrop-blur-lg border border-gray-500/50 focus:outline-none">
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export const MenuItem: React.FC<{ icon?: ReactNode; onClick?: () => void }> = ({
  children,
  icon,
  onClick,
}) => {
  return (
    <div className="p-1">
      <Menu.Item onClick={onClick}>
        {({ active }) => (
          <button
            className={`${
              active
                ? "bg-gray-500/75 backdrop-blur-lg text-white"
                : "text-gray-100"
            } group flex items-center rounded-lg w-full px-4 py-2.5`}
          >
            {icon && <span className={children ? "mr-2" : ""}>{icon}</span>}
            {children}
          </button>
        )}
      </Menu.Item>
    </div>
  );
};
