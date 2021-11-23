import { Box, chakra, Fade, Icon, IconButton } from "@chakra-ui/react";
import { IconBold, IconItalic, IconUnderline } from "@tabler/icons";
import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import { EditorEmptyState } from "./EditorEmptyState";

interface TipTapEditorProps {}

export const TipTapEditor: React.FC<TipTapEditorProps> = ({}) => {
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
    ],
    editorProps: {
      attributes: {
        class: "tiptap-editor",
      },
    },
  });

  return (
    <>
      {editor && (
        <Box
          shadow="md"
          rounded="lg"
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
