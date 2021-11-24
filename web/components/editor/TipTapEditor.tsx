import { Box, chakra, Fade, Icon, IconButton } from "@chakra-ui/react";
import { IconBold, IconItalic, IconUnderline } from "@tabler/icons";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useField } from "formik";
import React from "react";
import { SlashCommands } from "./commands/CommandsExtension";
import { EditorEmptyState } from "./EditorEmptyState";
import { InsertLinkPopover } from "./InsertLinkPopover";

interface TipTapEditorProps {}

export const TipTapEditor: React.FC<TipTapEditorProps> = ({}) => {
  const [_, __, { setValue }] = useField("editorJSON");
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "Heading";
          }
          return "Type '/' for commands";
        },
      }),
      SlashCommands,
      Link,
    ],
    editorProps: {
      attributes: {
        class: "tiptap-editor",
      },
    },
    onUpdate: ({ editor }) => setValue(editor.getJSON()),
  });

  return (
    <>
      {editor && (
        <Box
          shadow="sm"
          rounded="md"
          p={1}
          bgColor="white"
          border="1px"
          borderColor="gray.200"
          as={BubbleMenu}
          editor={editor}
        >
          <IconButton
            size="sm"
            variant="ghost"
            aria-label="bold"
            icon={
              <Icon
                as={IconBold}
                color="gray.600"
                size={20}
                w="auto"
                h="auto"
              />
            }
          />
          <IconButton
            size="sm"
            variant="ghost"
            aria-label="italic"
            icon={
              <Icon
                as={IconItalic}
                color="gray.600"
                size={20}
                w="auto"
                h="auto"
              />
            }
          />
          <IconButton
            size="sm"
            variant="ghost"
            aria-label="underline"
            icon={
              <Icon
                as={IconUnderline}
                color="gray.600"
                size={20}
                w="auto"
                h="auto"
              />
            }
          />
          <InsertLinkPopover editor={editor} />
        </Box>
      )}
      <EditorContent editor={editor} />
      <Fade in={editor?.isEmpty}>
        <chakra.hr mt={4} borderColor="gray.100" />
        <EditorEmptyState />
      </Fade>
    </>
  );
};
