import create from "zustand";

export const useEditorStore = create<{
  bodyJson: any;
  isValid: boolean;
  setIsValid: (b: boolean) => void;
  setBody: (body: any) => void;
}>((set) => ({
  bodyJson: null,
  isValid: false,
  setBody: (body: any) => set({ bodyJson: body }),
  setIsValid: (isValid: boolean) => set({ isValid }),
}));
