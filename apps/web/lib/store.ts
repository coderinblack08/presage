import { atom } from "jotai";

export const collapseAtom = atom(false);
export const currentFileAtom = atom({
  draftId: "",
  stringPath: [] as string[],
  absolutePath: [] as string[],
});

export const fileTreeAtom = atom(new Set<string>());
