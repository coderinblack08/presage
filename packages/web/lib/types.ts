export interface User {
  id: string;
  email?: string;
  username: string;
  bio?: string;
  profilePicture: string;
  displayName: string;
  articles?: Article[];
  createdAt: Date;
  updatedAt: Date;
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
  createdAt: Date;
  updatedAt: Date;
}

export interface Tag {
  id: string;
  name: string;
  usedBy: number;
  articles?: Article[];
}
