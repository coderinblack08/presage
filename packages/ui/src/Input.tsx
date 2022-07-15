import React, { forwardRef } from "react";

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  textarea?: boolean;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ textarea, className, icon, ...props }, ref) => {
    const styles = `px-4 py-2 rounded-xl border shadow-sm focus:outline-none focus:ring-none placeholder-gray-400 w-full ${
      textarea && "resize-none h-32"
    } ${className}`;
    if (textarea) {
      return (
        <textarea ref={ref as any} className={styles} {...(props as any)} />
      );
    } else {
      return (
        <input autoComplete="off" ref={ref} className={styles} {...props} />
      );
    }
  }
);

Input.displayName = "Input";
