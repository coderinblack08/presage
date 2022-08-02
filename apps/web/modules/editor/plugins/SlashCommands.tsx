import { Extension } from "@tiptap/core";
import Fuse from "fuse.js";
import { Editor, Range, ReactRenderer } from "@tiptap/react";
import Suggestion, { SuggestionOptions } from "@tiptap/suggestion";
import { Node as ProseMirrorNode } from "prosemirror-model";
import tippy, { Instance } from "tippy.js";
import { CommandsList } from "./CommandsList";
import {
  IconCode,
  IconHeading,
  IconLetterA,
  IconList,
  IconListNumbers,
  IconQuote,
} from "@tabler/icons";

export type CommandsOption = {
  HTMLAttributes?: Record<string, any>;
  renderLabel?: (props: {
    options: CommandsOption;
    node: ProseMirrorNode;
  }) => string;
  suggestion: Omit<SuggestionOptions, "editor">;
};

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    customExtension: {
      toggleBold: () => ReturnType;
      toggleItalic: () => ReturnType;
      toggleOrderedList: () => ReturnType;
      toggleBulletList: () => ReturnType;
      toggleBlockquote: () => ReturnType;
    };
  }
}

export const Commands = Extension.create<CommandsOption>({
  name: "slash-commands",
  addOptions() {
    return {
      suggestion: {
        char: "/",
        startOfLine: false,
        command: ({ editor, range, props }: any) => {
          props.command({ editor, range });
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

const commands = [
  {
    title: "Paragraph",
    shortcut: "p",
    icon: <IconLetterA size={16} />,
    command: ({ editor, range }: { editor: Editor; range: Range }) => {
      editor.chain().focus().deleteRange(range).setNode("paragraph").run();
    },
  },
  {
    title: "Heading",
    shortcut: "h1",
    icon: <IconHeading size={16} />,
    command: ({ editor, range }: { editor: Editor; range: Range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 1 })
        .run();
    },
  },
  {
    title: "Ordered List",
    icon: <IconListNumbers size={16} />,
    description: "Create a list with numberings",
    command: ({ editor, range }: { editor: Editor; range: Range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: "Bulleted List",
    description: "Create a bulleted list",
    icon: <IconList size={16} />,
    command: ({ editor, range }: { editor: Editor; range: Range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: "Quote",
    description: "Create a quote",
    icon: <IconQuote size={16} />,
    command: ({ editor, range }: { editor: Editor; range: Range }) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run();
    },
  },
  {
    title: "Code Block",
    description: "Create a code block",
    icon: <IconCode size={16} />,
    command: ({ editor, range }: { editor: Editor; range: Range }) => {
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
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
            getReferenceClientRect: props.clientRect as any,
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
          if (
            [
              "Space",
              "ArrowUp",
              "ArrowDown",
              "ArrowLeft",
              "ArrowRight",
            ].indexOf(props.event.key) > -1
          ) {
            props.event.preventDefault();
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
