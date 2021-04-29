import React from "react";

export interface InputProps extends React.ComponentPropsWithRef<"input"> {
  error?: boolean;
  textarea?: boolean;
}

export const Input: React.FC<InputProps> = ({ textarea, error, ...props }) => {
  return React.createElement(textarea ? "textarea" : "input", {
    className: `py-2 px-4 rounded-lg text-lighter-gray placeholder-gray bg-darker-gray focus:outline-none w-full ${
      error ? "ring-1 ring-red-500" : ""
    }`,
    ...props,
  });
};
