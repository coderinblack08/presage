export interface User {
  id: string;
  email?: string;
  username: string;
  bio?: string;
  profilePicture: string;
  displayName: string;
  followersCount: number;
  followingCount: number;
  isFollowing?: boolean;
  articles?: Article[];
  createdAt: string;
  updatedAt: string;
}

export interface Article {
  id: string;
  title: string;
  body: any | null;
  published: boolean;
  readingTime: string | null;
  userId: string;
  user: User;
  bodyJson: any;
  points: number;
  referralCount: number;
  tags: Tag[];
  journalId: string;
  journal: Journal;
  comments: Comment[];
  shoutouts: Shoutout[];
  canonical: string | null;
  liked: boolean | null;
  publishedDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  message: string;
  user: User;
  articleId: string;
  userId: string;
  path: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: string;
  name: string;
  usedBy: number;
  articles?: Article[];
}

export interface Journal {
  id: string;
  name: string;
  description: string;
  picture: string;
  userId: string;
  entries: number;
  user: User;
  createdAt: String;
}

export type RewardType = "shoutout" | "link" | "other";

export interface Reward {
  id: string;
  name: string;
  description: string;
  link: string | null;
  type: RewardType;
  points: number;
  user: User;
  claimed: number;
  createdAt: Date;
  updatedAt: Date;
}

export type ClaimStatus = "pending" | "declined" | "successful";

export interface ClaimedReward {
  id: string;
  createdAt: string;
  reward: Reward;
  user: User;
  shoutoutArticle: string | null;
  directMessageId: string | null;
  directMessage: DirectMessage | null;
  status: ClaimStatus;
}

export interface Referral {
  id: string;
  token: string;
  articleId: string;
  article: Article;
  referrerId: string;
  referrer: User;
  claimCount: number;
  createdAt: Date;
}

export interface UserPoints {
  userId: string;
  creatorId: string;
  user: User;
  creator: User;
  points: number;
}

export interface Shoutout {
  id: string;
  articleId: string;
  userId: string;
  user: User;
  article: Article;
}

export interface DirectMessage {
  id: string;
  open: boolean;
  senderId: string;
  recipientId: string;
  claimedRewardId: string;
  messages: Message[];
  sender: User;
  recipient: User;
  claimedReward: ClaimedReward;
  lastMessageSentAt: Date | null;
  createdAt: Date;
}

export interface Message {
  id: string;
  message: string;
  directMessageId: string;
  userId: string;
  user: User;
  directMessage: DirectMessage;
  createdAt: Date;
}
