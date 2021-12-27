import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import router, { useRouter } from "next/router";
import React, { useRef } from "react";
import { MdDelete, MdSettings } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { defaultMutationFn } from "../../lib/utils/defaultMutationFn";
import { Article } from "../../types";
import { InputField } from "../InputField";

interface SettingsDrawerProps {
  article: Article;
}

export const SettingsDrawer: React.FC<SettingsDrawerProps> = ({ article }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutateAsync, isLoading } = useMutation(defaultMutationFn);
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
              helperText="Improve your site's SEO by providing a canonical link to your original post"
            />
            <InputField
              label="Tags"
              name="tags"
              placeholder="Enter comma separated tags..."
              helperText="Provide up to 5 tags related to your article"
            />
            <InputField
              label="Description"
              name="description"
              placeholder="Enter description..."
              helperText="Summarize your article in 500 characters or less"
              rows={6}
              textarea
            />
          </VStack>
          <DrawerFooter>
            <Button
              isLoading={isLoading}
              onClick={async () => {
                await mutateAsync([`/articles/${article.id}`, {}, "DELETE"], {
                  onSuccess: () => {
                    queryClient.setQueryData<Article[]>(
                      "/articles/drafts",
                      (old) => old?.filter((a) => a.id !== article.id) || []
                    );
                  },
                });
                router.push("/dashboard");
              }}
              colorScheme="red"
              leftIcon={<MdDelete size={20} />}
            >
              Remove
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
