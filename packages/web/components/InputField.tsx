import { useField } from "formik";
import React from "react";
import { Input, InputProps } from "./Input";

export const InputField: React.FC<InputProps> = ({ textarea, ...props }) => {
  const [field, meta] = useField(props as any);

  return (
    <div className="w-full">
      <Input
        error={meta.touched && !!meta.error}
        textarea={textarea}
        {...field}
        {...props}
      />
      {meta.touched && !!meta.error ? (
        <p className="mt-1 small text-primary">{meta.error}</p>
      ) : null}
    </div>
  );
};
