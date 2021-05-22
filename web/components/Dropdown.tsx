import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

interface DropdownProps {
  menuButton: React.ReactNode;
  items: (React.ReactNode | { name: string; onClick: () => void })[];
}

export const Dropdown: React.FC<DropdownProps> = ({ menuButton, items }) => {
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
              className="absolute right-0 w-52 mt-4 origin-top-right bg-darkest-gray border border-darker-gray rounded-lg focus:outline-none overflow-hidden"
              static
            >
              {items.map((item, key) => (
                <Menu.Item key={key}>
                  {({ active }) => (
                    <button
                      className={`focus:outline-none inline-flex items-center text-left py-3 px-5 font-medium w-full text-base ${
                        active ? "bg-darker-gray" : ""
                      }`}
                      onClick={typeof item === "object" ? item.onClick : null}
                    >
                      {typeof item === "string" ? item : item.name}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
