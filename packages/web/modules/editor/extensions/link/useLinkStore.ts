import create from "zustand";
import { combine } from "zustand/middleware";

export const useLinkStore = create(
  combine({ show: false, closeUntilNextOpen: false }, (set, get) => ({
    setShow: (show: boolean) => {
      set({ show });
    },
    setCloseUntilNextOpen: (open: boolean) => set({ closeUntilNextOpen: open }),
  }))
);
