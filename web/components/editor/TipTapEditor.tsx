import {
  Box,
  Button,
  chakra,
  Fade,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";
import { IconBold, IconItalic, IconLink, IconUnderline } from "@tabler/icons";
import Placeholder from "@tiptap/extension-placeholder";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import { SlashCommands } from "./commands/CommandsExtension";
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
      SlashCommands,
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
          <Popover gutter={16}>
            <PopoverTrigger>
              <IconButton
                size="sm"
                variant="ghost"
                aria-label="link"
                icon={
                  <Icon
                    as={IconLink}
                    color="gray.600"
                    size={20}
                    w="auto"
                    h="auto"
                  />
                }
              />
            </PopoverTrigger>
            <Portal>
              <PopoverContent
                shadow="sm"
                _focus={{ outline: "none" }}
                zIndex={9999}
              >
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Insert Link</PopoverHeader>
                <PopoverBody>
                  <InputGroup size="sm">
                    <Input
                      size="sm"
                      rounded="md"
                      type="url"
                      placeholder="Enter url..."
                    />
                    <InputRightElement width="3.5rem">
                      <Button size="xs" flexShrink="0">
                        Insert
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>
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
