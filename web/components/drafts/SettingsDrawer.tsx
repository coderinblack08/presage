import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { MdSettings } from "react-icons/md";
import { InputField } from "../InputField";

interface SettingsDrawerProps {}

export const SettingsDrawer: React.FC<SettingsDrawerProps> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstFocus = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        leftIcon={<MdSettings size={20} />}
        onClick={onOpen}
      >
        Settings
      </Button>
      <Drawer
        initialFocusRef={firstFocus}
        size="sm"
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Settings</DrawerHeader>
          <VStack as={DrawerBody} spacing={6}>
            <InputField
              ref={firstFocus}
              label="Canonical URL"
              name="canonical"
              placeholder="Enter url..."
            />
            <InputField
              label="Tags"
              name="tags"
              placeholder="Enter comma separated tags..."
            />
            <InputField
              label="Description"
              name="description"
              placeholder="Enter description..."
              rows={6}
              textarea
            />
          </VStack>
        </DrawerContent>
      </Drawer>
    </>
  );
};
