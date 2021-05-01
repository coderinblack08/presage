import { Menu, Transition } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import Avatar from "react-avatar";
import { supabase } from "../lib/supabase";
import { useUser } from "../stores/auth";

interface UserDropdownProps {}

export const UserDropdown: React.FC<UserDropdownProps> = ({}) => {
  const router = useRouter();
  const { user } = useUser();

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="focus:outline-none">
              <Avatar
                name={user?.details?.username}
                alt={user?.details?.username}
                className="flex-shrink-0 rounded-full"
                size="36px"
              />
            </Menu.Button>
          </div>
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
              className="absolute right-0 w-52 mt-4 origin-top-right bg-darkest-gray rounded-lg focus:outline-none overflow-hidden"
            >
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`focus:outline-none inline-flex items-center text-left py-3 px-5 font-medium w-full text-base ${
                      active ? "bg-darker-gray" : ""
                    }`}
                  >
                    Profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`focus:outline-none inline-flex justify-between items-center text-left py-3 px-5 font-medium w-full text-base ${
                      active ? "bg-darker-gray" : ""
                    }`}
                  >
                    Language
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`focus:outline-none inline-flex items-center text-left py-3 px-5 font-medium w-full text-base ${
                      active ? "bg-darker-gray" : ""
                    }`}
                  >
                    Settings
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`focus:outline-none inline-flex items-center text-left py-3 px-5 font-medium w-full text-base ${
                      active ? "bg-darker-gray" : ""
                    }`}
                  >
                    Apply to Publish
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`focus:outline-none inline-flex items-center text-left py-3 px-5 font-medium w-full text-base ${
                      active ? "bg-darker-gray" : ""
                    }`}
                    onClick={async () => {
                      await supabase.auth.signOut();
                      router.push("/");
                    }}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
