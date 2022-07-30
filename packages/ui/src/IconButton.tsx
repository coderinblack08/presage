import React, { forwardRef } from "react";

export type IconButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children }, ref) => {
    return (
      <button
        ref={ref}
        className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-400 dark:text-gray-600"
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
