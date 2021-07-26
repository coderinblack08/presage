import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, ReactNode } from "react";

interface DropdownProps {
  opener: ReactNode;
  position?: "bottom-right" | "bottom-left";
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  opener,
  children,
  className,
  position = "bottom-left",
}) => {
  // let [reference, popper] = usePopper({
  //   placement: "bottom-end",
  //   strategy: "fixed",
  //   modifiers: [],
  // });
  const style =
    position === "bottom-right"
      ? "right-0 origin-top-right"
      : "left-0 origin-top-left";

  return (
    <Menu as="div" className="relative z-50 inline-block text-left">
      <div>{opener}</div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={`absolute w-56 mt-4 rounded-lg bg-white shadow focus:outline-none ${style} ${className}`}
        >
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
              active ? "bg-gray-100" : "bg-white"
            } group flex items-center rounded-lg w-full px-4 py-2.5 focus:outline-none`}
          >
            {icon && <span className={children ? "mr-2" : ""}>{icon}</span>}
            {children}
          </button>
        )}
      </Menu.Item>
    </div>
  );
};
