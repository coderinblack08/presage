import create from "zustand";
import { combine } from "zustand/middleware";

const defaultValue = { soundbite: null, playing: false, url: "" };

export const usePlayerStore = create(
  combine(defaultValue, (set) => ({
    play: (soundbite: any) => set({ soundbite }),
    setPlaying: (x: boolean) => set({ playing: x }),
    setUrl: (url: string) => set({ url }),
    clear: () => set({ ...defaultValue }),
  }))
);
