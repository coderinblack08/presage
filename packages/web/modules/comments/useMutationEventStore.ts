import omit from "lodash.omit";
import create from "zustand";
import { combine } from "zustand/middleware";

type Key = string | number | symbol;

export const useMutationEventStore = create(
  combine(
    {
      events: {} as Record<Key, any>,
    },
    (set, get) => ({
      add: (id: Key, event: any) =>
        set({ events: { ...get().events, [id]: event } }),
      listen: (id: Key) => get().events[id],
      has: (id: Key) => id in get().events,
      remove: (id: Key) => set({ events: omit(get().events, id) }),
    })
  )
);
