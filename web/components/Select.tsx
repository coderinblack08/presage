import React, { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Waypoint } from "react-waypoint";

interface SelectProps {
  defaultValue: string;
  items: string[];
  className?: string;
  onChange?: (value: string) => void;
  waypoint?: () => void;
}

export const Select: React.FC<SelectProps> = ({
  defaultValue,
  items,
  className,
  onChange,
  waypoint,
}) => {
  const [selected, setSelected] = useState(defaultValue);

  return (
    <Listbox
      value={selected}
      onChange={(value) => {
        setSelected(value);
        onChange && onChange(value);
      }}
    >
      {({ open }) => (
        <>
          <div className="relative mt-1">
            <Listbox.Button
              className={`relative py-2 pl-4 pr-12 text-left bg-darker-gray rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-gray sm:text-sm  ${className}`}
            >
              <span className="block truncate text-lighter-gray">
                {selected}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                static
                className="absolute z-50 p-2 mt-2 overflow-auto text-base bg-darker-gray shadow-2xl rounded-lg max-h-60 focus:outline-none sm:text-sm"
              >
                {items.map((item, i) => (
                  <Listbox.Option
                    key={i}
                    className={({ active }) =>
                      `${active ? "text-white bg-primary" : "text-lighter-gray"}
                          cursor-default select-none relative py-2 pl-10 pr-16 rounded-lg`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`${
                            selected ? "font-bold" : "font-medium"
                          } block truncate`}
                        >
                          {item}
                        </span>
                        {selected ? (
                          <span
                            className={`${
                              active ? "text-amber-600" : "text-amber-600"
                            }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                          >
                            <CheckIcon className="w-4 h-4" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
                <Waypoint onEnter={() => waypoint && waypoint()} />
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
