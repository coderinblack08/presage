import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useTokenStore } from "../store/useTokenStore";

interface AuthProviderProps {}

export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const hasTokens = useTokenStore((x) => !!x.accessToken && !!x.refreshToken);
  const { query, replace } = useRouter();

  useEffect(() => {
    if (
      typeof query.accessToken === "string" &&
      typeof query.refreshToken === "string" &&
      query.accessToken &&
      query.refreshToken
    ) {
      const { accessToken, refreshToken } = query;
      replace("/", undefined, { shallow: true });
      useTokenStore.getState().setTokens({
        accessToken,
        refreshToken,
      });
    }
  }, []);

  return <React.Fragment {...props} />;
};
