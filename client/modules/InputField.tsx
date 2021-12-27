import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, {
  forwardRef,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

type InputFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
    textarea?: boolean;
    helperText?: string;
  };

export const InputField = forwardRef<any, InputFieldProps>(
  ({ label, size: _, textarea, helperText, ...props }, ref) => {
    let InputOrTextarea: any = Input;
    if (textarea) {
      InputOrTextarea = Textarea;
    }
    const [field, { error, touched }] = useField(props);
    return (
      <FormControl isInvalid={!!error && touched}>
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
        <InputOrTextarea {...field} {...props} ref={ref} id={field.name} />
        {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
        {error && touched ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </FormControl>
    );
  }
);
