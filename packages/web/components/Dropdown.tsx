import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

export const DropdownItem: React.FC<React.ComponentProps<typeof Menu.Item>> = ({
  children,
  ...props
}) => {
  return (
    <Menu.Item {...props}>
      {({ active }) => (
        <div className="p-1">
          <button
            className={`${
              active ? "bg-gray-700 text-white" : "text-gray-100"
            } group flex items-center rounded-lg w-full px-4 py-2.5`}
          >
            {children}
          </button>
        </div>
      )}
    </Menu.Item>
  );
};

interface DropdownProps {
  openButton: React.ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({ openButton, children }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>{openButton}</div>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="origin-top-right absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-gray-800 bg-opacity-75 backdrop-filter backdrop-blur border border-gray-700 focus:outline-none"
            >
              {children}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
