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
  tags: Tag[];
  journalId: string;
  journal: Journal;
  comments: Comment[];
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
