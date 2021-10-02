import {
  QueryConstraint,
  collection,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";
import { useEffect, useMemo } from "react";
import useSWR, { mutate, SWRConfiguration } from "swr";
import { collectionCache } from "../collectionCache";
import { Document } from "../lib/document";

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

type Fn = (...args: unknown[]) => unknown;

function getValue<
  Provided,
  T = Provided extends Fn ? ReturnType<Provided> : Provided
>(valueOrFn: Provided, ...params: any[]): T {
  return typeof valueOrFn === "function" ? valueOrFn(...params) : valueOrFn;
}

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
      return getValue(
        collectionCache.queryTable[queryKey[0]],
        queryKey.slice(1)
      ) as QueryConstraint[];
    }
  }, [JSON.stringify(queryKey)]);

  const swr = useSWR(
    [path, JSON.stringify(queryKey)],
    async (path: string) => {
      return getCollection<Doc>(path, actualQuery || []);
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
