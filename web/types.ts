import { JSONContent } from "@tiptap/react";
import { FieldValue } from "firebase/firestore";

export interface User {
  id?: string;
  username: string;
  displayName: string;
  email?: string;
  profilePicture?: string;
  bio?: string;
  createdAt: FieldValue;
}

export interface Article {
  id: string;
  title: string;
  description?: string;
  isPublished: boolean;
  editorJSON?: JSONContent;
  tags: string[];
  canonical?: string;
  user?: User;
  userId: string;
  likeCount: number;
  shareCount: number;
  bookmarkCount: number;
  createdAt: FieldValue;
}

export enum RewardType {
  Shoutout = "shoutout",
  Message = "message",
}

export interface Reward {
  id: string;
  type: RewardType;
  name: string;
  description: string;
  cost: number;
  message?: string;
  maxShoutouts?: number;
  userId: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}
