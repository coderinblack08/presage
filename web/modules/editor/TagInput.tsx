import { IconX } from "@tabler/icons";
import { useField } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

interface TagInputProps {
  tags: string[] | undefined;
}

function tagToColor(s: string) {
  const colors = ["teal", "yellow", "red", "orange", "green", "blue", "purple"];
  const sum = s.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);

  const styles = {
    yellow: ["bg-yellow-100 text-yellow-900", "text-yellow-900/50"],
    teal: ["bg-teal-100 text-teal-900", "text-teal-900/50"],
    red: ["bg-red-100 text-red-900", "text-red-900/50"],
    orange: ["bg-orange-100 text-orange-900", "text-orange-900/50"],
    green: ["bg-green-100 text-green-900", "text-green-900/50"],
    blue: ["bg-blue-100 text-blue-900", "text-blue-900/50"],
    purple: ["bg-purple-100 text-purple-900", "text-purple-900/50"],
  };

  const color = colors[sum % colors.length] as keyof typeof styles;
  return styles[color];
}

export const TagInput: React.FC<TagInputProps> = ({ tags }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [_, { value, error }, { setValue }] = useField("tags");

  const [focused, setFocused] = React.useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  useEffect(() => {
    if (!error && !focused && open) {
      setOpen(false);
    }
  }, [error, focused, open]);

  return (
    <>
      <div
        className={open ? "hidden" : "block" + " space-x-2"}
        onClick={() => {
          setOpen(true);
          ref.current?.focus();
          console.log(ref);
        }}
      >
        {tags?.length === 0 || tags === undefined ? (
          <span className="text-gray-500">No tags</span>
        ) : null}
        {tags?.map((tag, index) => {
          const style = tagToColor(tag);
          return (
            <div
              key={index}
              className={`inline-flex items-center px-2.5 rounded-md ${style[0]} space-x-2`}
            >
              <span>{tag}</span>
              <IconX className={`w-4 h-4 ${style[1]}`} />
            </div>
          );
        })}
      </div>
      <div className={open ? "flex items-center" : "opacity-0 h-0"}>
        <Input
          ref={ref}
          className="w-96"
          placeholder="Enter up to 5 tags (comma separated)"
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !error) {
              e.preventDefault();
              setOpen(false);
            }
          }}
          onBlur={onBlur}
          onFocus={onFocus}
          value={value}
        />
        <Button
          onClick={() => setOpen(false)}
          colorScheme="white"
          className="ml-2 !p-2.5"
        >
          <IconX className="text-gray-600 w-5 h-5" />
        </Button>
      </div>
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
    </>
  );
};
