import { QuerySnapshot, DocumentData } from "@firebase/firestore";

export const snapshotToArray = (
  snapshot:
    | QuerySnapshot<DocumentData>
    | FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>
    | undefined
) => {
  const data: any[] = [];
  snapshot?.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
  return data;
};
