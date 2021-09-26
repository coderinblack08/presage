import { QuerySnapshot, DocumentData } from "@firebase/firestore";

export const snapshotToArray = (snapshot: QuerySnapshot<DocumentData>) => {
  const data: any[] = [];
  snapshot.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
  return data;
};
