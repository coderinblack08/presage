import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Field, useFormikContext } from "formik";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { MdError } from "react-icons/md";
import { useQuery } from "react-query";
import { Article } from "../../lib/types";
import { Tags } from "../article/Tags";
import { EditorFloatingMenu } from "./EditorFloatingMenu";
import { FormattingBubbleMenu } from "./FormattingBubbleMenu";
import { useEditorStore } from "./useEditorStore";

interface TipTapEditorProps {}

export const extensions = [
  StarterKit,
  Placeholder,
  Underline,
  Image,
  Dropcursor,
  // StarterKit.configure({ codeBlock: false }),
  // CodeBlockLowlight.extend({
  //   addNodeView() {
  //     return ReactNodeViewRenderer(CodeBlockComponent);
  //   },
  // }).configure({ lowlight }),
];

const TipTapEditor: React.FC<TipTapEditorProps> = ({}) => {
  const { setFieldValue, errors, isValid } = useFormikContext<{
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
      setFieldValue("body", editor.getHTML(), false);
      useEditorStore.getState().setBody(editor.getJSON());
    },
    content: draft?.bodyJson || null,
    editorProps: {
      attributes: {
        class: "prose focus:outline-none py-6 max-w-full",
      },
    },
  });

  useEffect(() => {
    useEditorStore.getState().setIsValid(isValid);
  }, [isValid]);

  useEffect(() => {
    editor?.commands.setContent(draft?.body || null);
    return () => {
      editor?.destroy();
    };
  }, [id]);

  return (
    <div>
      <div className="mt-2 w-full">
        <Field
          name="title"
          type="text"
          className="bg-gray-100 placeholder-gray-400 h3 md:h2 w-full focus:outline-none leading-none"
          placeholder="Untitled"
        />
        {!!errors.title ? (
          <div className="flex items-center space-x-2 mt-2">
            <MdError className="w-5 h-5 text-red" />
            <p className="text-red">{errors.title}</p>
          </div>
        ) : (
          <div />
        )}
        <div className={draft?.tags ? "mt-3" : ""}>
          {draft?.tags && draft.tags.length !== 0 ? (
            <Tags article={draft} />
          ) : null}
        </div>
        {editor && <FormattingBubbleMenu editor={editor} />}
        {editor && <EditorFloatingMenu editor={editor} />}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TipTapEditor;
