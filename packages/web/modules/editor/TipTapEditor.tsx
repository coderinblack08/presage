import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineLink,
  AiOutlineUnderline,
} from "react-icons/ai";
import { Button } from "../../components/button";
import { ArticleFragment } from "../../generated/graphql";
import { SlashCommands } from "./extensions/slash-menu/commands";

interface TipTapEditorProps {
  draft: ArticleFragment | null;
}

export const TipTapEditor: React.FC<TipTapEditorProps> = ({ draft }) => {
  const formik = useFormikContext<any>();
  const editor = useEditor({
    extensions: [
      StarterKit,
      SlashCommands,
      Placeholder.configure({ placeholder: "Type '/' for commands" }),
      Link,
    ],
    content: draft?.editorJSON || null,
    editorProps: {
      attributes: {
        class: "prose focus:outline-none max-w-full",
      },
    },
    onUpdate: ({ editor }) => {
      formik.setFieldValue("editorJSON", editor.getJSON());
    },
  });

  // useEffect(() => {
  //   if (editor && draft) {
  //     !editor.isDestroyed &&
  //       editor.commands.setContent(draft.editorJSON || null);
  //   }
  // }, [draft, editor]);

  // useEffect(() => {
  //   return () => {
  //     editor?.destroy();
  //   };
  // }, [editor]);

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
            <Button
              onClick={() => editor.chain().focus().toggleBold().run()}
              shadow={false}
              icon={<AiOutlineBold />}
            />
            <Button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              shadow={false}
              icon={<AiOutlineItalic />}
            />
            <Button shadow={false} icon={<AiOutlineUnderline />} />
            <Button shadow={false} icon={<AiOutlineLink />} />
          </div>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
    </>
  );
};
