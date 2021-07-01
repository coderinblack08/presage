export interface User {
  id: string;
  email?: string;
  username: string;
  bio?: string;
  profilePicture: string;
  displayName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Article {
  id: string;
  title: string;
  body: any | null;
  published: boolean;
  readingTime: number | null;
  likes: number;
  userId: string;
  user: User;
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
