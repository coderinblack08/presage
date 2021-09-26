import { QueryConstraint } from "firebase/firestore";

type Collections = {
  [path: string]: {
    key: [string | number, string | number | undefined]; // [path, queryString]
  }[];
};

class CollectionCache {
  private collections: Collections;
  queryTable: { [key: string]: QueryConstraint[] } = {};

  constructor() {
    this.collections = {};
  }

  addQuery(key: string, queries: QueryConstraint[]) {
    this.queryTable = { ...this.queryTable, [key]: queries };
  }

  getSWRKeysFromCollectionPath(path: string) {
    return (
      this.collections[path]
        ?.map(({ key }) => key.filter((keyItem) => typeof keyItem === "string")) // ???
        .filter(Boolean) ?? []
    );
  }

  addCollectionToCache(path: string, queryString?: string | number) {
    const collectionAlreadyExistsInCache = this.collections[path]?.some(
      ({ key }) => key[0] === path && key[1] === queryString
    );
    if (!collectionAlreadyExistsInCache) {
      this.collections = {
        ...this.collections,
        [path]: [
          ...(this.collections[path] ?? []),
          {
            key: [path, queryString],
          },
        ],
      };
    }
    return this.collections;
  }
}

export const collectionCache = new CollectionCache();
