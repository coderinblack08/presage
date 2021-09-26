import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { useEffect, useMemo } from "react";
import { collectionCache } from "src/collection-cache";
import useSWR, { mutate, SWRConfiguration } from "swr";
import { Document } from "../lib/document";

export type CollectionSWROptions<Doc extends Document = Document> =
  SWRConfiguration<Doc[] | null>;

export const getCollection = async <Doc extends Document = Document>(
  path: string,
  queries: any[]
) => {
  const firestore = getFirestore();
  const data = await getDocs(query(collection(firestore, path), ...queries));
  const array: Doc[] = [];

  data.forEach((doc) => {
    const newDoc = {
      ...(doc.data({ serverTimestamps: "estimate" }) ?? {}),
      id: doc.id,
      __snapshot: doc,
      hasPendingWrites: doc.metadata.hasPendingWrites,
      exists: doc.exists(),
    } as Doc;
    mutate(doc.ref.path, newDoc, false);
    array.push(newDoc);
  });

  return array;
};

export const useCollection = async <
  Data extends object = {},
  Doc extends Document = Document<Data>
>(
  path: string,
  queryKey: keyof typeof collectionCache.queryTable,
  swrOptions?: CollectionSWROptions<Doc>
) => {
  const actualQuery = useMemo(
    () => collectionCache.queryTable[queryKey],
    [queryKey]
  );
  const swr = useSWR(
    [path, queryKey],
    async (path: string) => {
      return getCollection<Doc>(path, actualQuery);
    },
    swrOptions
  );

  useEffect(() => {
    if (path) {
      collectionCache.addCollectionToCache(path, queryKey);
    }
  }, [path, queryKey]);

  return swr;
};
