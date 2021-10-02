import { QueryConstraint } from "firebase/firestore";
import { collectionCache } from "../firebase";

const queryTable: { [key: string]: QueryConstraint[] } = {};

Object.keys(queryTable).forEach((key) => {
  const query = queryTable[key];
  collectionCache.addQuery(key, query);
});
