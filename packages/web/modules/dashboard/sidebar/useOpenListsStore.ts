import create from "zustand";
import { combine } from "zustand/middleware";

export const useOpenListsStore = create(
  combine(
    {
      open: [] as string[],
    },
    (set) => ({
      setOpen: (journalId: string, openState: boolean) =>
        set((state) => ({
          open: openState
            ? [...state.open, journalId]
            : state.open.filter((x) => x !== journalId),
        })),
    })
  )
);
