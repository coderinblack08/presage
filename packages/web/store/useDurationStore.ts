import create from "zustand";
import getBlobDuration from "get-blob-duration";
import { combine } from "zustand/middleware";
import { Presage } from "../types";

export const useDurationStore = create(
  combine(
    {
      durations: {},
    },
    (set, get) => ({
      getDuration: async (presage: Presage) => {
        if (!presage) return;
        if (presage.type === "text") return;
        const durations = get().durations;
        if (presage.id in durations) {
          return durations[presage.id];
        }
        const blob = await fetch(presage.audio).then((r) => r.blob());
        const duration = Math.floor((await getBlobDuration(blob)) * 1000);

        set({ durations: { ...durations, id: duration } });
        return duration;
      },
    })
  )
);
