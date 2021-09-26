import { addDoc, collection, getFirestore } from "firebase/firestore";
import { mutate } from "swr";
import { collectionCache } from "./collection-cache";
import { Document } from "./lib/document";

export const revalidateDocument = (path: string) => {
  return mutate(path);
};

export const getCollectionPath = (path: string) => {
  let collectionPath: string | string[] = path.split(`/`).filter(Boolean);
  const docId = collectionPath.pop();
  return { path: collectionPath.join("/"), docId };
};

export const mutateCollectionsWithId = (
  path: string,
  docId: string,
  data: any
) => {
  collectionCache.getSWRKeysFromCollectionPath(path).forEach((key) => {
    mutate(
      key,
      (currentState: Document[] = []) => {
        if (!currentState.some((doc) => doc.id === docId)) {
          return currentState;
        }
        return currentState.map((document = {} as Document) => {
          if (document.id === docId) {
            return { ...document, ...data };
          }
          return document;
        });
      },
      false
    );
  });
};

export const revalidateCollection = (path: string) => {
  const promises: Promise<any>[] = [];
  collectionCache.getSWRKeysFromCollectionPath(path).forEach((key) => {
    promises.push(mutate(key));
  });
  return Promise.all(promises);
};

export const set = async <Data = any>(
  path: string | null,
  data: Partial<Data>
) => {
  if (path === null) return null;

  const isDocument = path.trim().split("/").filter(Boolean).length % 2 === 0;

  if (!isDocument) throw new Error("Provide a valid path");

  mutate(
    path,
    (prevState = {}) => {
      return {
        ...prevState,
        ...data,
      };
    },
    false
  );

  const firestore = getFirestore();
  const { docId, path: collectionPath } = getCollectionPath(path);

  if (docId) {
    mutateCollectionsWithId(collectionPath, docId, data);
  }

  return addDoc(collection(firestore, path) as any, data as any);
};
