import { atom } from "jotai";

export const focusedAtom = atom<string | null>(null);
export const collapseAtom = atom(false);
export const currentFileAtom = atom({
  draftId: "",
  stringPath: [] as string[],
  absolutePath: [] as string[],
});
