import { Input, InputProps } from "@presage/ui";
import { useField } from "formik";
import React from "react";

export const InputField = React.forwardRef<
  HTMLInputElement,
  InputProps & { label?: string; description?: string }
>(({ label, description, ...props }, ref) => {
  const [field, meta] = useField(props as any);

  return (
    <div className="w-full h-full">
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
        // error={meta.touched && !!meta.error}
        {...field}
        {...props}
      />
      {meta.touched && !!meta.error ? (
        <p className="mt-2 text-sm text-red">{JSON.stringify(meta.error)}</p>
      ) : null}
    </div>
  );
});

InputField.displayName = "InputField";
