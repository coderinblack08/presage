import {
  QueryConstraint,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useMemo } from "react";
import useSWR, { mutate, SWRConfiguration } from "swr";
import { collectionCache } from "../collectionCache";
import { Document } from "../utils/document";

export type CollectionSWROptions<
  Doc extends Document = Document
> = SWRConfiguration<Doc[] | null>;

export const getCollection = async <Doc extends Document = Document>(
  path: string,
  queries: any[]
) => {
  const data = await getDocs(
    query(collection(getFirestore(), path), ...queries)
  );
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

export const useCollection = <
  Data extends object = {},
  Doc extends Document = Document<Data>
>(
  path: string,
  queryKey: string | [string, ...any],
  swrOptions?: CollectionSWROptions<Doc>
) => {
  const actualQuery = useMemo(() => {
    if (typeof queryKey === "string") {
      return collectionCache.queryTable[queryKey] as QueryConstraint[];
    }
    if (typeof collectionCache.queryTable[queryKey[0]] === "function") {
      // @ts-ignore
      return collectionCache.queryTable[queryKey[0]](
        queryKey.slice(1)
      ) as QueryConstraint[];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(queryKey)]);

  const swr = useSWR(
    [path, JSON.stringify(queryKey)],
    async (path: string) => {
      const result = await getCollection<Doc>(path, actualQuery || []);
      return result;
    },
    swrOptions
  );

  useEffect(() => {
    if (path) {
      console.log(collectionCache.collections);
      collectionCache.addCollectionToCache(path, queryKey);
    }
  }, [path, queryKey]);

  return swr;
};
