import create from "zustand";

export const useEditorStore = create<{
  isValid: boolean;
  setIsValid: (b: boolean) => void;
}>((set) => ({
  isValid: false,
  setIsValid: (isValid: boolean) => set({ isValid }),
}));
