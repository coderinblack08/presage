import { BubbleMenu } from "@tiptap/react";
import React from "react";
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineLink,
  AiOutlineStrikethrough,
  AiOutlineUnderline,
} from "react-icons/ai";
import { Button } from "../../components/Button";
import { Select } from "../../components/Select";

interface BubbleMenuProps {
  editor: any;
}

export const FormattingBubbleMenu: React.FC<BubbleMenuProps> = ({ editor }) => {
  return (
    <BubbleMenu
      className="flex items-center bg-white divide-x divide-gray-200 shadow px-1.5 rounded-lg"
      tippyOptions={{ duration: 100 }}
      editor={editor}
    >
      <div className="mr-4">
        <Select
          value={(() => {
            for (let i of [1, 2, 3, 6]) {
              if (editor.isActive("heading", { level: i })) {
                return i;
              }
            }
            return 6;
          })()}
          onChange={(e) => {
            editor
              .chain()
              .focus()
              .toggleHeading({ level: parseInt(e.target.value) as any })
              .run();
          }}
          color="transparent"
          className="border-none flex-shrink-0 w-36"
        >
          <option value={1}>Heading 1</option>
          <option value={2}>Heading 2</option>
          <option value={3}>Heading 3</option>
          <option value={6}>Paragraph</option>
        </Select>
      </div>
      <div className="flex items-center space-x-2 px-4 py-1.5">
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          color={editor.isActive("bold") ? "gray" : "transparent"}
          size="small"
          icon={<AiOutlineBold className="w-4 h-4" />}
          noAnimate
        />
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          color={editor.isActive("italic") ? "gray" : "transparent"}
          size="small"
          icon={<AiOutlineItalic className="w-4 h-4" />}
          noAnimate
        />
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          color={editor.isActive("underline") ? "gray" : "transparent"}
          size="small"
          icon={<AiOutlineUnderline className="w-4 h-4" />}
          noAnimate
        />
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          color={editor.isActive("strike") ? "gray" : "transparent"}
          size="small"
          icon={<AiOutlineStrikethrough className="w-4 h-4" />}
          noAnimate
        />
        <Button
          type="button"
          onClick={() => {
            if (editor.isActive("link")) {
              editor.chain().focus().unsetLink().run();
            } else {
              const url = window.prompt("URL");
              if (url !== "") {
                editor
                  .chain()
                  .focus()
                  .extendMarkRange("link")
                  .setLink({ href: url })
                  .run();
              }
            }
          }}
          color={editor.isActive("link") ? "gray" : "transparent"}
          size="small"
          icon={<AiOutlineLink className="w-4 h-4" />}
          noAnimate
        />
        <Button
          onClick={() => editor.commands.clearNodes()}
          size="small"
          color="transparent"
          noAnimate
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-4 h-4"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                fill="currentColor"
                d="M12.651 14.065L11.605 20H9.574l1.35-7.661-7.41-7.41L4.93 3.515 20.485 19.07l-1.414 1.414-6.42-6.42zm-.878-6.535l.27-1.53h-1.8l-2-2H20v2h-4.927L13.5 9.257 11.773 7.53z"
              />
            </svg>
          }
        />
      </div>
    </BubbleMenu>
  );
};
