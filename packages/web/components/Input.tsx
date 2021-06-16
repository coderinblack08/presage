import React from "react";

export interface InputProps extends React.ComponentPropsWithRef<"input"> {
  error?: boolean;
  textarea?: boolean;
}

export const Input: React.FC<InputProps> = React.forwardRef(
  ({ textarea, className, error, ...props }, ref) => {
    return React.createElement(textarea ? "textarea" : "input", {
      ref,
      className: `rounded-lg text-gray-100 placeholder-gray-300 border border-gray-500 bg-gray-600 focus:outline-none w-full ${
        error ? "ring-1 ring-opacity-75 ring-primary" : ""
      } ${className} ${textarea ? "resize-none py-3 px-5" : "py-2 px-4"}`,
      ...props,
    });
  }
);
