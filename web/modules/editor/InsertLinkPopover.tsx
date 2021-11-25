import {
  Popover,
  PopoverTrigger,
  IconButton,
  Icon,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useDisclosure,
  PopoverFooter,
} from "@chakra-ui/react";
import { IconLink } from "@tabler/icons";
import { Editor } from "@tiptap/react";
import React, { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";

interface InsertLinkPopoverProps {
  editor: Editor;
}

export const InsertLinkPopover: React.FC<InsertLinkPopoverProps> = ({
  editor,
}) => {
  const [href, setHref] = useState("");
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const { onOpen, onClose, isOpen } = useDisclosure();

  function insertLink() {
    editor.commands.setLink({ href, target: "_blank" });
    setHref("");
    onClose();
  }

  function unsetLink() {
    editor.commands.unsetLink();
    setHref("");
    onClose();
  }

  useEffect(() => {
    if (editor.isActive("link")) {
      setHref(editor.getAttributes("link").href);
    }
  }, [editor.isActive("link")]);

  return (
    <Popover
      initialFocusRef={firstFieldRef}
      gutter={16}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    >
      <PopoverTrigger>
        <IconButton
          size="sm"
          variant={editor.isActive("link") ? "solid" : "ghost"}
          aria-label="link"
          icon={
            <Icon as={IconLink} color="gray.600" size={20} w="auto" h="auto" />
          }
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent shadow="sm" _focus={{ outline: "none" }} zIndex={9999}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>
            {editor.isActive("link") ? "Update" : "Insert"} Link
          </PopoverHeader>
          <PopoverBody>
            <InputGroup size="sm">
              <Input
                ref={firstFieldRef}
                value={href}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    insertLink();
                  }
                }}
                onChange={(e) => setHref(e.target.value)}
                placeholder="Enter url..."
                rounded="md"
                size="sm"
                type="url"
              />
              <InputRightElement w="3.5rem">
                <Button onClick={insertLink} flexShrink="0" size="xs">
                  Insert
                </Button>
              </InputRightElement>
            </InputGroup>
          </PopoverBody>
          {editor.isActive("link") ? (
            <PopoverFooter>
              <Button
                onClick={unsetLink}
                size="xs"
                colorScheme="red"
                leftIcon={<MdDelete />}
              >
                Delete
              </Button>
            </PopoverFooter>
          ) : null}
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
