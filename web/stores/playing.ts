import create from "zustand";
import { combine } from "zustand/middleware";

export const usePlayerStore = create(
  combine(
    {
      soundbite: null,
      playing: false,
      url: "",
    },
    (set) => ({
      play: (soundbite: any) => set({ soundbite }),
      setPlaying: (x: boolean) => set({ playing: x }),
      setUrl: (url: string) => set({ url }),
    })
  )
);
