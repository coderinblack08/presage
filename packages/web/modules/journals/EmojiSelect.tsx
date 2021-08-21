import { IconSelector } from "@tabler/icons";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { useField } from "formik";
import React, { useState } from "react";
import { Popover, PopoverTrigger } from "../../components/popover";

interface EmojiSelectProps {}

export const EmojiSelect: React.FC<EmojiSelectProps> = ({}) => {
  const [open, setOpen] = useState(false);
  const [field, meta, helpers] = useField("emoji");

  return (
    <Popover
      // open={open}
      // setOpen={setOpen}
      trigger={
        <PopoverTrigger>
          <button
            type="button"
            // onClick={() => setOpen(!open)}
            className="flex items-center justify-between w-full bg-white border shadow-sm px-4 py-2 rounded-lg"
          >
            <div className="flex items-center">
              <div className="text-2xl mr-3">{field.value}</div>
              <span className="font-semibold">Pick Emoji Icon</span>
            </div>
            <IconSelector className="text-gray-400" size={20} />
          </button>
        </PopoverTrigger>
      }
    >
      <Picker onSelect={(v) => helpers.setValue((v as any).native)} />
    </Popover>
  );
};
