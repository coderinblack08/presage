import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

interface TipTapEditorProps {}

export const TipTapEditor: React.FC<TipTapEditorProps> = ({}) => {
  const editor = useEditor({
    extensions: [StarterKit, Placeholder],
    content: "<p>Hello World! 🌎️</p>",
    editorProps: {
      attributes: {
        class: "prose focus:outline-none py-8",
      },
    },
  });

  return (
    <div>
      <EditorContent editor={editor} />
      <div className="flex items-center space-x-2">
        <svg
          viewBox="0 0 16 16"
          version="1.1"
          width="16"
          height="16"
          aria-hidden="true"
          className="text-primary"
        >
          <path
            fillRule="evenodd"
            fill="currentColor"
            d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z"
          ></path>
        </svg>
        <p className="small text-primary font-semibold">
          Styling with Markdown is supported
        </p>
      </div>
    </div>
  );
};
