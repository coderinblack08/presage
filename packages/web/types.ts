import { Content } from "@tiptap/core/dist/packages/core/src/types";
import { FieldValue } from "firebase/firestore";

export interface User {
  uid?: string;
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
  canonical?: string;
  journal?: Journal;
  user?: User;
  userId: string;
  journalId: string;
  likeCount: number;
  bookmarkCount: number;
  createdAt: FieldValue;
}

export interface Reward {
  id: string;
  type: RewardType;
  points: number;
  name: string;
  description?: string;
  claimedCount?: number;
  createdAt: FieldValue;
}

export enum RewardType {
  Form = "Form",
  Shoutout = "Shoutout",
  Message = "Message",
}

export enum ReactionType {
  Like = "Like",
  Bookmark = "Bookmark",
}

export interface Comment {
  id: string;
  userId: string;
  message: string;
  user: {
    profilePicture: string;
    displayName: string;
    username: string;
  };
  replyCount: number;
}
