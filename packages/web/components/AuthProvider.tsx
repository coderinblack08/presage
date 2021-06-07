import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useTokenStore } from "../store/useTokenStore";

interface AuthProviderProps {}

export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const hasTokens = useTokenStore((x) => !!x.accessToken && !!x.refreshToken);
  const { query, replace } = useRouter();

  useEffect(() => {
    if (
      typeof query.access_token === "string" &&
      typeof query.refresh_token === "string" &&
      query.access_token &&
      query.refresh_token
    ) {
      const { access_token, refresh_token } = query;
      replace("/", undefined, { shallow: true });
      useTokenStore.getState().setTokens({
        accessToken: access_token,
        refreshToken: refresh_token,
      });
    }
  }, []);

  return <React.Fragment {...props} />;
};
