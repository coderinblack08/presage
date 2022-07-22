import Dropcursor from "@tiptap/extension-dropcursor";
import Highlight from "@tiptap/extension-highlight";
import { Plugin } from "prosemirror-state";
// import Focus from "@tiptap/extension-focus";
import { BubbleMenu, EditorContent, Extension, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

import { DraggableItems } from "./plugins/DraggableItems";
import { SlashCommands } from "./plugins/SlashCommands";
import { Placeholder } from "./plugins/Placeholder";
import { TrailingNode } from "./plugins/TrailingNode";
import {
  IconBold,
  IconCode,
  IconHighlight,
  IconItalic,
  IconStrikethrough,
} from "@tabler/icons";

const topLevelElements = [
  "paragraph",
  "heading",
  "blockquote",
  "orderedList",
  "bulletList",
  "codeBlock",
];

interface RichTextEditorProps {}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({}) => {
  const editor = useEditor({
    extensions: [
      Highlight.configure({ multicolor: true }),
      StarterKit.configure({
        dropcursor: false,
        paragraph: false,
        heading: false,
        blockquote: false,
        bulletList: false,
        orderedList: false,
        horizontalRule: false,
        codeBlock: false,
      }),
      Placeholder.configure({ placeholder: "Type '/' for commands" }),
      // Focus.configure({ className: "has-focus", mode: "all" }),
      Dropcursor.configure({ width: 3, color: "#68cef8" }),
      SlashCommands,
      Extension.create({
        priority: 10000,
        addGlobalAttributes() {
          return [
            {
              types: topLevelElements,
              attributes: {
                topLevel: {
                  default: false,
                  rendered: false,
                  keepOnSplit: false,
                },
                nestedParentType: {
                  default: null,
                  rendered: false,
                  keepOnSplit: true,
                },
              },
            },
          ];
        },
        addProseMirrorPlugins() {
          return [
            new Plugin({
              appendTransaction: (_transactions, oldState, newState) => {
                if (newState.doc === oldState.doc) {
                  return;
                }
                const tr = newState.tr;
                newState.doc.descendants((node, pos, parent) => {
                  if (topLevelElements.includes(node.type.name)) {
                    tr.setNodeMarkup(pos, null, {
                      topLevel: parent === newState.doc,
                      nestedParentType: parent?.type.name,
                    });
                  }
                });
                return tr;
              },
            }),
          ];
        },
      }),
      TrailingNode,
      ...DraggableItems,
    ],
    onCreate: ({ editor: e }) => {
      e.state.doc.descendants((node, pos, parent) => {
        if (topLevelElements.includes(node.type.name)) {
          e.view.dispatch(
            e.state.tr.setNodeMarkup(pos, null, {
              topLevel: parent === e.state.doc,
              nestedParentType: parent?.type.name,
            })
          );
        }
      });
    },
    content: "<p></p>",
    editorProps: {
      attributes: {
        spellcheck: "false",
        class:
          "prose max-w-[calc(100%+2rem)] focus:outline-none -ml-8 py-4 " +
          "prose-code:bg-gray-100 prose-code:font-medium prose-code:font-mono prose-code:rounded-lg prose-code:px-2 prose-code:py-1 prose-code:border prose-code:text-gray-500 " +
          "prose-blockquote:border-l-2 prose-blockquote:pl-4 prose-blockquote:text-gray-400 prose-blockquote:not-italic " +
          "prose-headings:leading-tight prose-headings:tracking-tight prose-h1:text-2xl prose-h1:font-bold prose-h1:text-gray-900 prose-h1:font-bold",
      },
    },
  });

  return (
    <>
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ placement: "top-start" }}
          className="bg-white rounded-lg flex items-center space-x-1 p-1 shadow border"
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`${
              editor.isActive("bold") ? "bg-gray-100" : ""
            } p-1 rounded-lg text-gray-500`}
          >
            <IconBold size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`${
              editor.isActive("italic") ? "bg-gray-100" : ""
            } p-1 rounded-lg text-gray-500`}
          >
            <IconItalic size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`${
              editor.isActive("strike") ? "bg-gray-100" : ""
            } p-1 rounded-lg text-gray-500`}
          >
            <IconStrikethrough size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`${
              editor.isActive("code") ? "bg-gray-100" : ""
            } p-1 rounded-lg text-gray-500`}
          >
            <IconCode size={16} />
          </button>
          {/* <div className="border-r border-gray-200 h-8" /> */}
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={`${
              editor.isActive("highlight") ? "bg-gray-100" : ""
            } p-1 rounded-lg text-gray-500`}
          >
            <IconHighlight size={16} />
          </button>
          {/* <button className="p-4 bg-yellow-100 border rounded-lg border-yellow-200" />
          <button className="p-4 bg-green-100 border rounded-lg border-green-200" />
          <button className="p-4 bg-blue-100 border rounded-lg border-blue-200" />
          <button className="p-4 bg-red-100 border rounded-lg border-red-200" /> */}
        </BubbleMenu>
      )}
      {/* <pre>{JSON.stringify(editor?.state.doc, null, 2)}</pre> */}
      <EditorContent suppressContentEditableWarning editor={editor} />
    </>
  );
};
