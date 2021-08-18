import { useField } from "formik";
import React, { forwardRef } from "react";

export type TextareaProps = {
  error?: boolean;
  outline?: boolean;
} & React.ComponentPropsWithRef<"textarea">;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, outline, ...props }, ref) => {
    const styles = `px-4 py-2 rounded-lg text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:ring focus:ring-gray-300 w-full ${
      error
        ? "ring ring-red/25 border-red/75 focus:ring-red/25 focus:border-red/75"
        : ""
    } ${
      outline ? "border shadow-sm focus:border-gray-500/50" : "shadow"
    } resize-none h-28`;

    return (
      <div className="inline-block relative w-full">
        <textarea ref={ref} className={`${styles} ${className}`} {...props} />
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export const TextareaField: React.FC<
  TextareaProps & { label?: string; description?: string }
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
        <p className="text-gray-600 font-normal small mb-3">{description}</p>
      )}
      <Textarea
        ref={ref}
        error={meta.touched && !!meta.error}
        {...field}
        {...props}
      />
      {meta.touched && !!meta.error ? (
        <p className="mt-1 text-sm text-red">{meta.error}</p>
      ) : null}
    </div>
  );
});

TextareaField.displayName = "InputField";
