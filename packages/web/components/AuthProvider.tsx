import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useQueryClient } from "react-query";

interface AuthProviderProps {}

export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const { query, replace } = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (
      typeof query.authRedirect === "string" &&
      query.authRedirect === "true"
    ) {
      replace("/explore", undefined, { shallow: true });
      queryClient.clear();
    }
  }, [query]);

  return <React.Fragment {...props} />;
};
