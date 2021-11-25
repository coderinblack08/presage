import { Icon, MenuItem } from "@chakra-ui/react";
import React from "react";
import { MdAdd } from "react-icons/md";
import { useNewDraftMutation } from "../drafts/useNewDraftMutation";

interface NewDraftProps {}

export const NewDraft: React.FC<NewDraftProps> = ({}) => {
  const { mutate, isLoading } = useNewDraftMutation();

  return (
    <MenuItem
      onClick={() => mutate()}
      disabled={isLoading}
      icon={<Icon as={MdAdd} color="gray.400" size={18} w="auto" h="auto" />}
      command="⌘⇧K"
    >
      New Draft
    </MenuItem>
  );
};
