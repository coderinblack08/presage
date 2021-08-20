import { EditorContent, useEditor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import { SlashCommands } from "./extensions/slash-menu/commands";

interface TipTapEditorProps {}

export const TipTapEditor: React.FC<TipTapEditorProps> = ({}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      SlashCommands,
      Placeholder.configure({ placeholder: "Type '/' for commands" }),
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
      <EditorContent editor={editor} />
    </>
  );
};
