import { Content } from "@tiptap/core/dist/packages/core/src/types";
import { FieldValue } from "firebase/firestore";

export interface User {
  username: string;
  displayName: string;
  email?: string;
  profilePicture?: string;
  bio?: string;
  createdAt: FieldValue;
}

export interface Journal {
  id: string;
  name: string;
  description?: string;
  emoji: string;
  userId: string;
  drafts: string[];
  createdAt: FieldValue;
}

export interface Article {
  id: string;
  title: string;
  description?: string;
  isPublished: boolean;
  editorJSON?: Content;
  editorHTML?: string;
  tags: string[];
  journal?: Journal;
  userId: string;
  journalId: string;
  createdAt: FieldValue;
}
