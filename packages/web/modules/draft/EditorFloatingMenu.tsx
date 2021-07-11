import { Editor, FloatingMenu } from "@tiptap/react";
import React from "react";
import { MdCode, MdImage } from "react-icons/md";

interface EditorFloatingMenuProps {
  editor: Editor;
}

export const EditorFloatingMenu: React.FC<EditorFloatingMenuProps> = ({
  editor,
}) => {
  return (
    <FloatingMenu
      className="flex items-center px-4 rounded-lg divide-x divide-gray-200 bg-white shadow"
      tippyOptions={{ duration: 100 }}
      editor={editor}
    >
      <button
        className="pr-4 py-1.5"
        onClick={() => {
          editor.chain().focus().toggleCodeBlock().run();
        }}
      >
        <MdCode className="w-5 h-5" />
      </button>
      <button
        className="pl-4 py-1.5"
        onClick={() => {
          const url = window.prompt("URL");

          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
      >
        <MdImage className="w-5 h-5" />
      </button>
    </FloatingMenu>
  );
};
