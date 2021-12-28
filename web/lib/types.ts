export interface User {
  id?: string;
  username: string;
  displayName: string;
  email?: string;
  profilePicture?: string;
  bio?: string;
  createdAt: Date;
}

export interface Article {
  id: string;
  title: string;
  description?: string;
  isPublished: boolean;
  editorJSON?: any;
  tags: string[];
  canonical?: string;
  user?: User;
  userId: string;
  likeCount: number;
  shareCount: number;
  commentCount: number;
  publishedAt?: Date;
  createdAt: Date;
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
