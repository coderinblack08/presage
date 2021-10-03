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
  tags: string[];
  userId: string;
  journalId: string;
  createdAt: FieldValue;
}
