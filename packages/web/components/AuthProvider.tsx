import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useQueryClient } from "react-query";

interface AuthProviderProps {}

export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const { query, replace } = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (typeof query.accessToken === "string" && query.accessToken) {
      const { accessToken } = query;
      localStorage.setItem("access-token", accessToken?.toString());
      replace("/", undefined, { shallow: true });
      queryClient.clear();
    }
  }, [query]);

  return <React.Fragment {...props} />;
};
