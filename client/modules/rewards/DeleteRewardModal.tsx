import {
  useDisclosure,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  MenuItem,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import { defaultMutationFn } from "../../lib/utils/defaultMutationFn";
import { Reward } from "../../types";

interface DeleteRewardModalProps {
  reward: Reward;
}

export const DeleteRewardModal: React.FC<DeleteRewardModalProps> = ({
  reward,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutateAsync, isLoading } = useMutation(defaultMutationFn);
  const cancelRef = useRef<any>(null);
  const queryClient = useQueryClient();

  return (
    <>
      <MenuItem onClick={onOpen}>Delete</MenuItem>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Discard Reward?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to discard this reward? All data will be lost,
            however, claimed rewards will still be processed.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={async () => {
                await mutateAsync([`/rewards/${reward.id}`, {}, "DELETE"], {
                  onSuccess: () => {
                    queryClient.setQueryData<Reward[]>("/rewards", (old) => {
                      return old?.filter((r) => r.id !== reward.id) || [];
                    });
                  },
                });
                onClose();
              }}
              colorScheme="red"
              isLoading={isLoading}
              ml={3}
            >
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
