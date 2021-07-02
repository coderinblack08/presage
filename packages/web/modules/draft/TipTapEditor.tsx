import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { generateHTML } from "@tiptap/html";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Field, useFormikContext } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineStrikethrough,
  AiOutlineUnderline,
} from "react-icons/ai";
import { useQuery } from "react-query";
import { Button } from "../../components/Button";
import { Select } from "../../components/Select";
import { Article } from "../../lib/types";

interface TipTapEditorProps {}

const extensions = [StarterKit, Placeholder, Underline];

export const TipTapEditor: React.FC<TipTapEditorProps> = ({}) => {
  const { values, setFieldValue, errors } = useFormikContext<{
    title: string;
    body: any;
  }>();
  const {
    query: { id },
  } = useRouter();
  const { data: draft } = useQuery<Article>(`/articles/draft/${id}`);
  const editor = useEditor({
    extensions,
    onUpdate: ({ editor }) => {
      setFieldValue("body", editor.getJSON(), false);
    },
    content: draft?.body ? generateHTML(draft?.body, extensions) : null,
    editorProps: {
      attributes: {
        class: "prose focus:outline-none py-8 max-w-3xl",
      },
    },
  });

  useEffect(() => {
    editor?.commands.setContent(
      draft?.body ? generateHTML(draft?.body, extensions) : null
    );
  }, [id]);

  return (
    <div>
      <div className="space-y-3 mt-2 w-full">
        <Field
          name="title"
          type="text"
          className="bg-gray-700 placeholder-gray-400 h2 w-full focus:outline-none leading-tight"
          placeholder="Untitled"
        />
        {errors.title ? (
          <p className="text-primary">{errors.title}</p>
        ) : (
          <p className="text-gray-400">
            <span className="text-gray-300">
              {values.title.trim().length}/100
            </span>{" "}
            characters used
          </p>
        )}
        {draft?.tags.length ? (
          <div className="flex space-x-3">
            {draft?.tags.map((tag) => (
              <p key={tag.id} className="text-gray-300">
                <span className="text-gray-200">#</span>
                {tag.name}
              </p>
            ))}
          </div>
        ) : null}
        <div className="border-b border-gray-600 pt-4" />
        {editor && (
          <BubbleMenu
            className="flex items-center bg-gray-600 divide-x divide-gray-500 border border-gray-500 px-1.5 rounded-lg"
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
                className="border-none py-1.5"
              >
                <option value={1}>Heading 1</option>
                <option value={2}>Heading 2</option>
                <option value={3}>Heading 3</option>
                <option value={6}>Paragraph</option>
              </Select>
            </div>
            <div className="flex items-center space-x-2 px-4 py-1.5">
              <Button
                onClick={() => editor.chain().focus().toggleBold().run()}
                color={editor.isActive("bold") ? "gray" : "transparent"}
                size="small"
                icon={<AiOutlineBold className="w-4 h-4" />}
              />
              <Button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                color={editor.isActive("italic") ? "gray" : "transparent"}
                size="small"
                icon={<AiOutlineItalic className="w-4 h-4" />}
              />
              <Button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                color={editor.isActive("underline") ? "gray" : "transparent"}
                size="small"
                icon={<AiOutlineUnderline className="w-4 h-4" />}
              />
              <Button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                color={editor.isActive("strike") ? "gray" : "transparent"}
                size="small"
                icon={<AiOutlineStrikethrough className="w-4 h-4" />}
              />
              <Button
                onClick={() => editor.commands.clearNodes()}
                size="small"
                color="transparent"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-4 h-4 text-gray-100"
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
        )}
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
    </div>
  );
};
