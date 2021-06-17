import create from "zustand";
import { combine } from "zustand/middleware";
import { Echo } from "../../lib/types";

const defaultValues = {
  echo: null as Echo | null,
  playing: false,
  preview: false,
  url: "",
};

export const usePlayerStore = create(
  combine({ ...defaultValues, volume: 1 }, (set) => ({
    play: (echo: Echo) => set({ echo }),
    setPlaying: (x: boolean) => set({ playing: x }),
    setUrl: (url: string) => set({ url }),
    setVolume: (volume: number) => set({ volume }),
    setPreview: (x: boolean) => set({ preview: x }),
    clear: () => set({ ...defaultValues }),
  }))
);
