import { useField } from "formik";
import ContentEditable from "react-contenteditable";
import React, { useRef, useState } from "react";

interface TitleInputProps {}

export const TitleInput: React.FC<TitleInputProps> = ({}) => {
  const [_, { value }, { setValue }] = useField("title");
  const ref = useRef<HTMLElement>(null);

  function handleChange() {
    setValue(ref.current?.innerText || "");
  }

  return (
    <ContentEditable
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          return false;
        }
      }}
      onPaste={(e) => {
        e.preventDefault();
        return false;
      }}
      className="focus:outline-none w-full font-bold text-3xl leading-relaxed"
      innerRef={ref}
      disabled={false}
      html={value}
      onChange={handleChange}
      tagName="h1"
    />
  );
};
