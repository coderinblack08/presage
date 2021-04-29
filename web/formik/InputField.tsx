import { useField } from "formik";
import React from "react";
import { Input, InputProps } from "../components/Input";

export const InputField: React.FC<InputProps> = ({ className, ...props }) => {
  const [field, meta] = useField(props as any);
  return (
    <div className={`h-full w-full ${className}`}>
      <Input error={!!meta.error} {...field} {...props} />
      {meta.error && meta.touched ? (
        <div className="mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};
