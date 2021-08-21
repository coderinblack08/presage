import { Extension } from "@tiptap/core";
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
      command: ({ editor, range, props }: any) => {
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
  description: "Big section heading",
  command: ({ editor, range }: { editor: Editor; range: Range }) => {
    editor.chain().focus().deleteRange(range).setNode(type, { level }).run();
  },
});

export const SlashCommands = Commands.configure({
  suggestion: {
    items: (query) => {
      return [
        textItemHelper("paragraph"),
        textItemHelper("heading", 1),
        textItemHelper("heading", 2),
        textItemHelper("heading", 3),
        {
          title: "Ordered List",
          description: "Create a list with numberings",
          command: ({ editor, range }: { editor: Editor; range: Range }) => {
            editor.chain().focus().deleteRange(range).toggleOrderedList().run();
          },
        },
        {
          title: "Bulleted List",
          description: "Create a bulleted list",
          command: ({ editor, range }: { editor: Editor; range: Range }) => {
            editor.chain().focus().deleteRange(range).toggleBulletList().run();
          },
        },
        {
          title: "Quote",
          description: "Create a quote",
          command: ({ editor, range }: { editor: Editor; range: Range }) => {
            editor.chain().focus().deleteRange(range).toggleBlockquote().run();
          },
        },
      ].filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
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
