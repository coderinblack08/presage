import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface TipTapEditorProps {}

export const TipTapEditor: React.FC<TipTapEditorProps> = ({}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
  });

  return <EditorContent editor={editor} />;
};
