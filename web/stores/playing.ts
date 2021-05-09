import create from "zustand";
import { combine } from "zustand/middleware";

export const usePlayerStore = create(
  combine(
    {
      soundbite: null,
    },
    (set) => ({ play: (soundbite: any) => set({ soundbite }) })
  )
);
