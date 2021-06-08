import { useTokenStore } from "../store/useTokenStore";
import { apiBaseUrl } from "./constants";

export const mutator = async ([path, body, method = "POST"]: [
  string,
  any,
  "POST" | "PUT"
]) => {
  const { accessToken, refreshToken, setTokens } = useTokenStore.getState();

  const request = await fetch(apiBaseUrl + path, {
    method,
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
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
