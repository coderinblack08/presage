import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useTokenStore } from "../store/useTokenStore";

interface AuthProviderProps {}

export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const { query, replace } = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (
      typeof query.access_token === "string" &&
      typeof query.refresh_token === "string" &&
      query.access_token &&
      query.refresh_token
    ) {
      const { access_token, refresh_token } = query;
      useTokenStore.getState().setTokens({
        accessToken: access_token,
        refreshToken: refresh_token,
      });
      replace("/", undefined, { shallow: true });
      queryClient.clear();
    }
  }, [query]);

  return <React.Fragment {...props} />;
};
