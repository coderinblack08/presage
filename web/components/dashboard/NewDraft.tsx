import { MenuItem, Icon } from "@chakra-ui/react";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import React from "react";
import { MdAdd } from "react-icons/md";
import { useQuery } from "react-query";
import { firebase } from "../../lib/firebase";
import { Article, User } from "../../types";

interface NewDraftProps {}

export const NewDraft: React.FC<NewDraftProps> = ({}) => {
  const { data: me } = useQuery<User>("/api/me");

  async function newDraft() {
    addDoc(collection(firebase.db, "articles"), {
      title: "Untitled",
      isPublished: false,
      likeCount: 0,
      bookmarkCount: 0,
      shareCount: 0,
      userId: me?.id,
      createdAt: serverTimestamp(),
    } as Article);
  }

  return (
    <MenuItem
      onClick={newDraft}
      icon={<Icon as={MdAdd} color="gray.400" size={18} w="auto" h="auto" />}
      command="⌘⇧K"
    >
      New Draft
    </MenuItem>
  );
};
