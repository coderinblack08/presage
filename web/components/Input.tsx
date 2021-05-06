import React from "react";

export interface InputProps extends React.ComponentPropsWithRef<"input"> {
  error?: boolean;
  textarea?: boolean;
}

export const Input: React.FC<InputProps> = ({
  textarea,
  className,
  error,
  ...props
}) => {
  return React.createElement(textarea ? "textarea" : "input", {
    className: `rounded-lg text-lighter-gray placeholder-gray bg-darker-gray focus:outline-none w-full ${
      error ? "ring-1 ring-opacity-75 ring-primary" : ""
    } ${className} ${textarea ? "resize-none py-3 px-5" : "py-2 px-4"}`,
    ...props,
  });
};
