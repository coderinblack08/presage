import { Soundbite } from "@presage/gql";
import create from "zustand";
import { combine } from "zustand/middleware";

const defaultValue = {
  soundbite: null as Soundbite,
  playing: false,
  preview: false,
  url: "",
};

export const usePlayerStore = create(
  combine({ ...defaultValue, volume: 1 }, (set) => ({
    play: (soundbite: any) => set({ soundbite }),
    setPlaying: (x: boolean) => set({ playing: x }),
    setUrl: (url: string) => set({ url }),
    setVolume: (volume: number) => set({ volume }),
    setPreview: (x: boolean) => set({ preview: x }),
    clear: () => set({ ...defaultValue }),
  }))
);
