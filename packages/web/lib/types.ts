export interface User {
  id: string;
  email: string;
  profilePicture: string;
  displayName: string;
  username: string;
  bio: string;
  googleId: string;
  createdAt: Date;
}

export interface Journal {
  id: string;
  icon: string;
  name: string;
  description: string | null;
  userId: string;
  createdAt: Date;
}

export interface Article {
  id: string;
  title: string;
  canonical: string | null;
  tags: string[];
  access: ViewAccess;
  isPublished: boolean;
  description: string | null;
  editorJSON: JSON | null;
  editorHTML: string | null;
  journalId: string;
  userId: string;
  updatedAt: Date;
  createdAt: Date;
  publishedAt: Date | null;
}

export enum ViewAccess {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
}
