import create from "zustand";
import { combine } from "zustand/middleware";

const defaultValue = { soundbite: null, playing: false, url: "" };

export const usePlayerStore = create(
  combine({ ...defaultValue, volume: 1 }, (set) => ({
    play: (soundbite: any) => set({ soundbite }),
    setPlaying: (x: boolean) => set({ playing: x }),
    setUrl: (url: string) => set({ url }),
    setVolume: (volume: number) => set({ volume }),
    clear: () => set({ ...defaultValue }),
  }))
);
