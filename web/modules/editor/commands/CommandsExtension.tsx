import {
  IconCursorText,
  IconHeading,
  IconList,
  IconListNumbers,
  IconPhoto,
  IconQuote,
} from "@tabler/icons";
import { Extension } from "@tiptap/core";
import { Editor, Range, ReactRenderer } from "@tiptap/react";
import Suggestion, { SuggestionOptions } from "@tiptap/suggestion";
import Fuse from "fuse.js";
import { Node as ProseMirrorNode } from "prosemirror-model";
import React from "react";
import tippy, { Instance } from "tippy.js";
import { CommandsList } from "./CommandsList";

export type CommandsOption = {
  HTMLAttributes?: Record<string, any>;
  renderLabel?: (props: {
    options: CommandsOption;
    node: ProseMirrorNode;
  }) => string;
  suggestion: Omit<SuggestionOptions, "editor">;
};

export const Commands = Extension.create<CommandsOption>({
  name: "slash-commands",
  addOptions() {
    return {
      suggestion: {
        char: "/",
        startOfLine: false,
        command: ({ editor, range, props }) => {
          props.command({ editor, range }, props.file);
        },
      },
    };
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

const textItemHelper = (
  type: "heading" | "paragraph",
  icon: React.ReactNode,
  level?: number
) => ({
  icon,
  title: type === "heading" ? `Heading ${level}` : "Paragraph",
  shortcut: level ? `h${level}` : "p",
  description: level
    ? `Create a ${["large", "medium", "small"][level - 1]} heading`
    : "Create a paragraph",
  command: ({ editor, range }: { editor: Editor; range: Range }) => {
    editor.chain().focus().deleteRange(range).setNode(type, { level }).run();
  },
});

const commands = [
  textItemHelper("paragraph", <IconCursorText />),
  textItemHelper("heading", <IconHeading />, 1),
  textItemHelper("heading", <IconHeading />, 2),
  textItemHelper("heading", <IconHeading />, 3),
  {
    title: "Ordered List",
    shortcut: "ol",
    description: "Create a numbered list",
    icon: <IconListNumbers />,
    command: ({ editor, range }: { editor: Editor; range: Range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: "Bulleted List",
    description: "Create a bulleted list",
    icon: <IconList />,
    shortcut: "ul",
    command: ({ editor, range }: { editor: Editor; range: Range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: "Quote",
    description: " Insert a quote",
    icon: <IconQuote />,
    command: ({ editor, range }: { editor: Editor; range: Range }) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run();
    },
  },
  {
    title: "Image",
    shortcut: "img",
    description: "Insert an uploaded image",
    icon: <IconPhoto />,
    command: (
      { editor, range }: { editor: Editor; range: Range },
      file: File
    ) => {
      const url = URL.createObjectURL(file);
      editor.chain().focus().setImage({ src: url, alt: file.name }).run();
    },
  },
];

const fuse = new Fuse(commands, { keys: ["title", "description", "shortcut"] });

export const SlashCommands = Commands.configure({
  suggestion: {
    items: ({ query }) => {
      return query ? fuse.search(query).map((x) => x.item) : commands;
    },
    render: () => {
      let component: ReactRenderer;
      let popup: Instance<any>[];

      return {
        onStart(props) {
          component = new ReactRenderer(CommandsList as any, {
            editor: props.editor as Editor,
            props,
          });

          popup = tippy("body", {
            getReferenceClientRect: props.clientRect,
            appendTo: document.body,
            content: component.element,
            showOnCreate: true,
            interactive: true,
            trigger: "manual",
            zIndex: 2 ** 31 + 1,
            placement: "bottom-start",
          });
        },
        onUpdate(props) {
          component.updateProps(props);
          popup[0].setProps({
            getReferenceClientRect: props.clientRect,
          });
        },
        onKeyDown(props) {
          if (props.event.key === "Escape") {
            popup[0].hide();
            return true;
          }
          return (component.ref as any).onKeyDown(props);
        },
        onExit() {
          popup[0].destroy();
          component.destroy();
        },
      };
    },
  },
});
