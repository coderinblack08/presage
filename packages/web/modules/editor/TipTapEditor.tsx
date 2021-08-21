import Placeholder from "@tiptap/extension-placeholder";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import React from "react";
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineLink,
  AiOutlineUnderline,
} from "react-icons/ai";
import { Button } from "../../components/button";
import {
  LinkOverlay,
  LinkOverlayExtension,
  setLink,
} from "./extensions/link/LinkOverlay";
import { SlashCommands } from "./extensions/slash-menu/commands";

interface TipTapEditorProps {}

export const TipTapEditor: React.FC<TipTapEditorProps> = ({}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      SlashCommands,
      Placeholder.configure({ placeholder: "Type '/' for commands" }),
      LinkOverlayExtension,
      Link,
    ],
    content: "<p>Hello World! 🌎️</p>",
    editorProps: {
      attributes: {
        class: "prose focus:outline-none",
      },
    },
  });

  return (
    <>
      {editor && (
        <BubbleMenu
          shouldShow={null}
          pluginKey="bubble-menu"
          className="flex items-center bg-white divide-x divide-gray-200 shadow px-1.5 py-1 rounded-lg"
          editor={editor}
        >
          <div className="flex items-center space-x-1">
            <Button shadow={false} icon={<AiOutlineBold />} />
            <Button shadow={false} icon={<AiOutlineItalic />} />
            <Button shadow={false} icon={<AiOutlineUnderline />} />
            <Button
              shadow={false}
              icon={<AiOutlineLink />}
              onClick={() => setLink(editor)}
            />
          </div>
        </BubbleMenu>
      )}
      <LinkOverlay editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};
