import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

interface DropdownProps {
  menuButton: React.ReactNode;
  marginTop?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  menuButton,
  children,
  marginTop,
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>{menuButton}</div>
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
              className={`absolute z-50 right-0 w-52 ${
                marginTop ? "mt-4" : ""
              } origin-top-right bg-darkest-gray border border-darker-gray rounded-lg focus:outline-none overflow-hidden`}
              static
            >
              {children}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export const DropdownItem: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & { icon?: React.ReactNode }
> = ({ children, icon, ...props }) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={`focus:outline-none inline-flex items-center text-left py-3 px-5 font-medium w-full text-base ${
            active ? "bg-darker-gray" : ""
          }`}
          {...props}
        >
          {icon ? <div className="mr-2">{icon}</div> : null}
          {children}
        </button>
      )}
    </Menu.Item>
  );
};
