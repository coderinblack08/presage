import create from "zustand";
import { combine } from "zustand/middleware";
import { Presage } from "../types";

const defaultValue = {
  presage: null as Presage,
  playing: false,
  preview: false,
  url: "",
};

export const usePlayerStore = create(
  combine({ ...defaultValue, volume: 1 }, (set) => ({
    play: (presage: Presage) => set({ presage }),
    setPlaying: (x: boolean) => set({ playing: x }),
    setUrl: (url: string) => set({ url }),
    setVolume: (volume: number) => set({ volume }),
    setPreview: (x: boolean) => set({ preview: x }),
    clear: () => set({ ...defaultValue }),
  }))
);
