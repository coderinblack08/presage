import { Extension } from "@tiptap/core";
import Fuse from "fuse.js";
import { Editor, Range, ReactRenderer } from "@tiptap/react";
import Suggestion, { SuggestionOptions } from "@tiptap/suggestion";
import { Node as ProseMirrorNode } from "prosemirror-model";
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
  name: "commands",
  defaultOptions: {
    suggestion: {
      char: "/",
      startOfLine: false,
      command: ({ editor, range, props }) => {
        props.command({ editor, range });
      },
    },
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

const textItemHelper = (type: "heading" | "paragraph", level?: number) => ({
  title: type === "heading" ? `Heading ${level}` : "Paragraph",
  shortcut: level ? `h${level}` : "p",
  command: ({ editor, range }: { editor: Editor; range: Range }) => {
    editor.chain().focus().deleteRange(range).setNode(type, { level }).run();
  },
});

const commands = [
  textItemHelper("paragraph"),
  textItemHelper("heading", 1),
  textItemHelper("heading", 2),
  textItemHelper("heading", 3),
  {
    title: "Ordered List",
    shortcut: "ol",
    command: ({ editor, range }: { editor: Editor; range: Range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: "Bulleted List",
    shortcut: "ul",
    command: ({ editor, range }: { editor: Editor; range: Range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: "Quote",
    command: ({ editor, range }: { editor: Editor; range: Range }) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run();
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
            appendTo: () => document.body,
            content: component.element,
            showOnCreate: true,
            interactive: true,
            trigger: "manual",
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
