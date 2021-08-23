import { useField } from "formik";
import { decode } from "html-entities";
import React from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

interface TitleInputProps {}

export const TitleInput: React.FC<TitleInputProps> = ({}) => {
  const [field, _, helpers] = useField("title");

  const handleChange = (e: ContentEditableEvent) => {
    helpers.setValue(decode(e.target.value));
  };

  const handleBlur = () => {
    helpers.setTouched(true);
  };

  return (
    <ContentEditable
      data-placeholder="Untitled"
      className="text-3xl font-bold focus:outline-none"
      html={field.value}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
};
