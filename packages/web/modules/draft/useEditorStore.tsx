import { combine } from "zustand/middleware";
import create from "zustand";

export const useEditorStore = create(
  combine({ draftId: "" }, (set) => ({
    setDraft: (id: string) => set({ draftId: id }),
  }))
);
