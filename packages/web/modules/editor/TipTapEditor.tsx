import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineLink,
  AiOutlineUnderline,
} from "react-icons/ai";
import { Button } from "../../components/button";
import { Article } from "../../types";
import { extensions } from "./extensions";

interface TipTapEditorProps {
  draft: Article | undefined;
}

export const TipTapEditor: React.FC<TipTapEditorProps> = ({ draft }) => {
  const formik = useFormikContext<any>();
  const editor = useEditor({
    extensions,
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
      {editor && (
        <BubbleMenu
          shouldShow={null}
          pluginKey="bubble-menu"
          className="flex items-center bg-white border divide-x divide-gray-200 shadow-md px-1.5 py-1 rounded-lg"
          editor={editor}
        >
          <div className="flex items-center space-x-1">
            <Button
              onClick={() => editor.chain().focus().toggleBold().run()}
              shadow={false}
              icon={<AiOutlineBold />}
              color={editor.isActive("bold") ? "gray" : "white"}
            />
            <Button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              shadow={false}
              icon={<AiOutlineItalic />}
              color={editor.isActive("italic") ? "gray" : "white"}
            />
            <Button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              shadow={false}
              icon={<AiOutlineUnderline />}
              color={editor.isActive("underline") ? "gray" : "white"}
            />
            <Button shadow={false} icon={<AiOutlineLink />} />
          </div>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
    </>
  );
};
