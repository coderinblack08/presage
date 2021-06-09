export interface User {
  id: string;
  email: string;
  username: string;
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
  content?: string;
  description?: string;
  audio?: string;
  thumbnail?: string;
  userId?: string;
  user?: User;
  likes: number;
  liked?: boolean;
  official?: boolean;
  publisher?: string;
  createdAt: Date;
  updatedAt: Date;
}
