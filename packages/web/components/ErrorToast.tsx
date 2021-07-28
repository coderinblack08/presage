import create from "zustand";
import React, { useEffect } from "react";
import { combine } from "zustand/middleware";
import toast, { Toaster } from "react-hot-toast";

interface ErrorToastProps {}

export const useErrorStore = create(
  combine({ error: null as Error | null }, (set) => ({
    setError: (error: Error) => set({ error }),
  }))
);

export const ErrorToast: React.FC<ErrorToastProps> = ({}) => {
  const error = useErrorStore((x) => x.error);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return <Toaster />;
};
