import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getCollectionPath, mutateCollectionsWithId } from "src/mutations";
import useSWR from "swr";
import { Document } from "../lib/document";

const getDocument = async <Doc extends Document = Document<any>>(
  path: string
) => {
  const firestore = getFirestore();
  const data = await getDoc(doc(firestore, path));

  return {
    ...(data.data({ serverTimestamps: "estimate" }) ?? {}),
    id: data.id,
    __snapshot: data,
    hasPendingWrites: data.metadata.hasPendingWrites,
    exists: data.exists(),
  } as Doc;
};

export const useDocument = async <
  Data extends object = {},
  Doc extends Document = Document<Data>
>(
  path: string
) => {
  const swr = useSWR<Doc | null>(path, async (path: string) => {
    const data = await getDocument<Doc>(path);
    return data;
  });

  const { docId, path: collectionPath } = getCollectionPath(path);
  if (docId) {
    mutateCollectionsWithId(collectionPath, docId, swr.data);
  }

  return swr;
};
