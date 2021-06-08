import { RadioGroup } from "@headlessui/react";
import React from "react";
import { Presage } from "../../types";

interface TypeRadioOptionProps {
  heading: string;
  description: string;
  value: Presage["type"];
}

export const TypeRadioOption: React.FC<TypeRadioOptionProps> = ({
  heading,
  description,
  value,
}) => {
  return (
    <RadioGroup.Option
      value={value}
      className={({ checked }) =>
        `${
          checked
            ? "bg-primary border border-faint-primary"
            : "bg-gray-800 border border-gray-700"
        } text-left py-4 px-6 rounded-lg focus:outline-none focus:ring w-full`
      }
      as="button"
    >
      {({ checked }) => (
        <>
          <h6 className="font-sans font-bold text-white">{heading}</h6>
          <p className={checked ? "text-white-primary" : "text-gray-300"}>
            {description}
          </p>
        </>
      )}
    </RadioGroup.Option>
  );
};
