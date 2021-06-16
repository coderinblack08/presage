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
  user: User;
  createdAt: Date;
  updatedAt: Date;
}
