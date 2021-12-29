import Link from "@tiptap/extension-link";
import Dropcursor from "@tiptap/extension-dropcursor";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useField } from "formik";
import React, { useEffect } from "react";
import { Article } from "../../lib/types";
import { SlashCommands } from "./commands/CommandsExtension";
import { EditorEmptyState } from "./EditorEmptyState";

interface TipTapEditorProps {
  draft: Article | undefined;
}

export const extensions = [
  StarterKit.configure({ dropcursor: false }),
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === "heading") {
        return "Heading";
      }
      return "Type '/' for commands";
    },
  }),
  Dropcursor.configure({
    color: "#f5f5f5",
    width: 2,
  }),
  SlashCommands,
  Underline,
  Image,
  Link,
];

export const TipTapEditor: React.FC<TipTapEditorProps> = ({ draft }) => {
  const [_, __, { setValue }] = useField("editorJSON");
  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class:
          "prose prose-neutral prose-img:rounded-lg prose-img:mx-auto !max-w-full focus:outline-none py-10",
      },
    },
    content: draft?.editorJSON || null,
    onUpdate: ({ editor }) => setValue(editor.getJSON()),
  });

  useEffect(() => {
    if (editor) {
      !editor.isDestroyed &&
        editor.commands.setContent(draft?.editorJSON || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft?.id, editor]);

  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  return (
    <>
      <EditorContent editor={editor} />
      {editor?.isEmpty && <EditorEmptyState />}
    </>
  );
};
