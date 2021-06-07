import { QueryFunctionContext } from "react-query";
import { useTokenStore } from "../store/useTokenStore";
import { apiBaseUrl } from "./constants";

export const fetcher = async <T = any>(
  context: QueryFunctionContext<any>
): Promise<T> => {
  const { accessToken, refreshToken, setTokens } = useTokenStore.getState();

  const request = await fetch(`${apiBaseUrl}${context.queryKey}`, {
    headers: {
      "access-token": accessToken,
      "refresh-token": refreshToken,
    },
  });

  if (request.status !== 200) {
    throw new Error(await request.text());
  }

  const newAccessToken = request.headers.get("access-token");
  const newRefreshToken = request.headers.get("refresh-token");

  if (newAccessToken && newRefreshToken) {
    setTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  }

  return await request.json();
};
