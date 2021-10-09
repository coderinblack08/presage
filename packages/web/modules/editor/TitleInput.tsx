import { useField } from "formik";
import { decode } from "html-entities";
import React, { useRef, useState } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

interface TitleInputProps {}

export const TitleInput: React.FC<TitleInputProps> = ({}) => {
  const [field, _, helpers] = useField("title");

  const handleChange = (e: ContentEditableEvent) => {
    const html = e.target.value;
    helpers.setValue(strip(decode(html)));
  };

  const handleBlur = () => {
    helpers.setTouched(true);
  };

  const strip = (html: string) => {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.innerText;
  };

  return (
    <ContentEditable
      data-placeholder="Untitled"
      className="text-3xl leading-normal font-bold focus:outline-none"
      html={field.value}
      onBlur={handleBlur}
      onPaste={(e) => {
        e.preventDefault();
        const text = e.clipboardData.getData("text");
        document.execCommand("insertText", false, text);
      }}
      onChange={handleChange}
    />
  );
};
