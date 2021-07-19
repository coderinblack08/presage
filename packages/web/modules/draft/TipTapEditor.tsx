import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";
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
      console.log(editor.getJSON());
      setFieldValue("body", editor.getJSON(), false);
    },
    content: draft?.bodyJson || null,
    editorProps: {
      attributes: {
        class: "prose focus:outline-none py-6 lg:py-8 max-w-full",
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
          <div className="mt-2">
            <div className="flex items-center divide-x divide-gray-300">
              <div className="inline-flex items-center space-x-2.5 pr-4">
                <img
                  className="w-5 h-5 rounded-full"
                  src={draft?.journal.picture}
                  alt={draft?.journal.name}
                />
                <span className="text-gray-800 font-semibold">
                  {draft?.journal.name}
                </span>
              </div>
              <div className="pl-4">
                {draft?.tags && draft.tags.length !== 0 ? (
                  <Tags article={draft} />
                ) : (
                  <div className="text-gray-500">No tags</div>
                )}
              </div>
            </div>
          </div>
        )}
        {editor && <FormattingBubbleMenu editor={editor} />}
        {editor && <EditorFloatingMenu editor={editor} />}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TipTapEditor;
