import React from "react";
import { InputField } from "../../components/input";

interface TitleInputProps {}

export const TitleInput: React.FC<TitleInputProps> = ({}) => {
  // const [field, _, helpers] = useField("title");

  // const handleChange = (e: ContentEditableEvent) => {
  //   helpers.setValue(e.target.value);
  // };

  // const handleBlur = () => {
  //   helpers.setTouched(true);
  // };

  // const strip = (html: string) => {
  //   const temp = document.createElement("div");
  //   temp.innerHTML = html;
  //   return temp.innerText;
  // };

  return (
    <InputField
      name="title"
      placeholder="Untitled"
      className="text-3xl leading-normal font-bold focus:outline-none shadow-none !p-0 focus:ring-0 rounded-none"
    />
  );
};
