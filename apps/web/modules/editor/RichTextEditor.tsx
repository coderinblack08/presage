import Dropcursor from "@tiptap/extension-dropcursor";
import { Plugin } from "prosemirror-state";
import Focus from "@tiptap/extension-focus";
import { EditorContent, Extension, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

import { DraggableItems } from "./plugins/DraggableItems";
import { SlashCommands } from "./plugins/SlashCommands";
import { Placeholder } from "./plugins/Placeholder";

const topLevelElements = ["paragraph", "heading", "blockquote"];

interface RichTextEditorProps {}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        dropcursor: false,
        paragraph: false,
        heading: false,
        blockquote: false,
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
              types: [
                "heading",
                "paragraph",
                "blockquote",
                "orderedList",
                "bulletList",
              ],
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
      ...DraggableItems,
    ],
    onCreate: ({ editor: e }) => {
      console.log("create");
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
          "prose-headings:leading-tight prose-headings:tracking-tight prose-h1:text-3xl prose-h1:font-bold prose-h1:text-gray-900 prose-h1:font-bold prose-h2:mt-2",
      },
    },
  });

  return (
    <>
      {/* <pre>{JSON.stringify(editor?.state.doc, null, 2)}</pre> */}
      <EditorContent suppressContentEditableWarning editor={editor} />
    </>
  );
};
