import { QueryConstraint, where } from "firebase/firestore";

type Collections = {
  [path: string]: {
    key: [string | number, any]; // [path, queryString]
  }[];
};

type QueryType = QueryConstraint[] | ((...args: any[]) => QueryConstraint[]);

class CollectionCache {
  collections: Collections;
  queryTable: { [key: string]: QueryType } = {};

  constructor() {
    this.collections = {};
  }

  addQuery(key: string, queries: QueryType) {
    this.queryTable = { ...this.queryTable, [key]: queries };
  }

  getSWRKeysFromCollectionPath(path: string) {
    return (
      this.collections[path]
        ?.map(({ key }) => key.filter((keyItem) => typeof keyItem === "string")) // ???
        .filter(Boolean) ?? []
    );
  }

  addCollectionToCache(
    path: string,
    queryString?: string | [string, ...any[]]
  ) {
    const collectionAlreadyExistsInCache = this.collections[path]?.some(
      ({ key }) => key[0] === path && key[1] === JSON.stringify(queryString)
    );
    if (!collectionAlreadyExistsInCache) {
      this.collections = {
        ...this.collections,
        [path]: [
          ...(this.collections[path] ?? []),
          {
            key: [path, JSON.stringify(queryString)],
          },
        ],
      };
    }
    return this.collections;
  }
}

export const collectionCache = new CollectionCache();
