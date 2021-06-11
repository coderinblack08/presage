export interface User {
  id: string;
  email: string;
  username: string;
  bio?: string;
  profilePicture: string;
  displayName: string;
  googleId: string;
  tokenVersion: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Presage {
  id: string;
  type: "audio" | "text";
  title?: string;
  description?: string;
  content?: string;
  audio?: string;
  thumbnail?: string;
  userId: string;
  user: User;
  points: number;
  liked?: boolean;
  duration?: number;
  createdAt: Date;
  updatedAt: Date;
}
