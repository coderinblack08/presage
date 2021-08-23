import { useField } from "formik";
import React, { forwardRef } from "react";

export type InputProps = {
  error?: boolean;
  outline?: boolean;
  shortcut?: string;
  icon?: React.ReactNode;
} & React.ComponentPropsWithRef<"input">;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, outline, icon, shortcut, ...props }, ref) => {
    const styles = `px-4 py-2 rounded-lg text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:ring focus:ring-gray-300 w-full ${
      error
        ? "ring ring-red/25 border-red/75 focus:ring-red/25 focus:border-red/75"
        : ""
    } ${outline ? "border shadow-sm focus:border-gray-500/50" : "shadow"} ${
      icon ? "pl-12" : ""
    } ${shortcut ? "pr-16" : ""}`;

    return (
      <div className="inline-block relative w-full">
        {icon && (
          <div className="absolute inset-y-0 left-0 mx-4 h-full flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        {shortcut && (
          <div className="absolute inset-y-0 h-full right-0 flex items-center pointer-events-none pr-2">
            <span className="border-b-2 bg-gray-100 rounded-md px-2.5 py-0.5 text-sm">
              {shortcut}
            </span>
          </div>
        )}
        <input ref={ref} className={`${styles} ${className}`} {...props} />
      </div>
    );
  }
);

Input.displayName = "Input";

export const InputField: React.FC<
  InputProps & { label?: string; description?: string }
> = React.forwardRef(({ label, description, ...props }, ref) => {
  const [field, meta] = useField(props as any);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={props.name} className="font-bold mb-1 inline-block">
          {label}
        </label>
      )}
      {description && (
        <p className="text-gray-600 font-normal text-sm mb-3">{description}</p>
      )}
      <Input
        ref={ref}
        error={meta.touched && !!meta.error}
        {...field}
        {...props}
      />
      {meta.touched && !!meta.error ? (
        <p className="mt-2 text-sm text-red">{meta.error}</p>
      ) : null}
    </div>
  );
});

InputField.displayName = "InputField";
