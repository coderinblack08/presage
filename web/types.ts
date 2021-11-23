import { FieldValue } from "firebase/firestore";

export interface User {
  uid?: string;
  username: string;
  displayName: string;
  email?: string;
  profilePicture?: string;
  bio?: string;
  createdAt: FieldValue;
}
