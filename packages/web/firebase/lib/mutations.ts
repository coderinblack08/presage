import { addDoc, collection, getFirestore } from "firebase/firestore";
import { mutate } from "swr";
import { collectionCache } from "../collectionCache";
import { Document } from "./document";

export const revalidateDocument = (path: string) => {
  return mutate(path);
};

export const getCollectionPath = (path: string, ignoreDocId = false) => {
  let collectionPath: string | string[] = path.split(`/`).filter(Boolean);
  if (ignoreDocId) {
    return { path: collectionPath.join("/") };
  }
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
          return [...currentState, data];
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

export const setDoc = async <Data = any>(
  path: string | null,
  data: Partial<Data>,
  generateId: boolean = true
) => {
  if (path === null) return null;

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

  const { docId, path: collectionPath } = getCollectionPath(path, generateId);
  console.log(docId, collectionPath);
  const newDoc = await addDoc(
    collection(getFirestore(), collectionPath) as any,
    data as any
  );

  if (docId && !generateId) {
    mutateCollectionsWithId(collectionPath, docId, data);
  } else if (newDoc.id && generateId) {
    mutateCollectionsWithId(collectionPath, newDoc.id, data);
  }

  return newDoc;
};
