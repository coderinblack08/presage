import create from "zustand";
import { persist } from "zustand/middleware";

type TokenState = {
  accessToken: string;
  refreshToken: string;
  setTokens: (obj: { accessToken: string; refreshToken: string }) => void;
};

export const useTokenStore = create<TokenState>(
  persist(
    (set) => ({
      accessToken: "",
      refreshToken: "",
      setTokens: ({ accessToken, refreshToken }) =>
        set({ accessToken, refreshToken }),
    }),
    { name: "token-store" }
  )
);
