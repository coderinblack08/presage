import {
  Text,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Textarea,
  VStack,
  Box,
  Avatar,
  Divider,
} from "@chakra-ui/react";
import React, { useRef } from "react";

interface CommentsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommentsDrawer: React.FC<CommentsDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const firstFocus = useRef<HTMLTextAreaElement>(null);

  return (
    <Drawer
      size="sm"
      initialFocusRef={firstFocus}
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Comments</DrawerHeader>
        <DrawerBody as={VStack} spacing={8} align="start">
          <HStack spacing={4} align="start">
            <Avatar size="sm" name="Kevin Lu" />
            <Box>
              <HStack spacing={3}>
                <Text color="gray.500">Kevin Lu</Text>
                <Divider orientation="vertical" h={4} borderColor="gray.300" />
                <Text color="gray.500">August 21, 2020</Text>
              </HStack>
              <Text mt={1}>Hello</Text>
            </Box>
          </HStack>
        </DrawerBody>
        <DrawerFooter as={VStack}>
          <Textarea
            ref={firstFocus}
            placeholder="Enter your comment..."
            resize="none"
          />
          <Button w="full" colorScheme="blue">
            Reply
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
