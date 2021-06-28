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

export interface Echo {
  id: string;
  title: string;
  description?: string;
  audio: string;
  thumbnail?: string;
  duration: number;
  userId: string;
  categoryId?: string;
  user: User;
  category?: Category;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  echoCount: number;
}

export interface Radio {
  id: string;
  prompt: string;
  description?: string;
  closed: boolean;
  responses: number;
  userId: string;
  user: User;
  echos?: Echo[];
  categoryId?: string;
  category?: Category;
  createdAt: Date;
  updatedAt: Date;
}
