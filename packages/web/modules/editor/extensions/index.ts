import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { Extension, Extensions } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { SlashCommands } from "./slash-menu/commands";

export const extensions: Extensions = [
  StarterKit as Extension,
  SlashCommands,
  Placeholder.configure({ placeholder: "Type '/' for commands" }),
  Underline,
  Link,
];
