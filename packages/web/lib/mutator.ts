import axios from "axios";
import { useTokenStore } from "../store/useTokenStore";
import { apiBaseUrl } from "./constants";

export const mutator = async ([path, body, method = "POST"]: [
  string,
  any,
  "POST" | "PUT"
]) => {
  const { accessToken, refreshToken, setTokens } = useTokenStore.getState();
  const isMultipart = body instanceof FormData;

  const config = {
    headers: {
      "content-type": isMultipart ? "multipart/form-data" : "application/json",
      "access-token": accessToken,
      "refresh-token": refreshToken,
    },
  };

  const request = await axios.post(apiBaseUrl + path, body, config);

  if (request.status !== 200) {
    throw new Error(request.data);
  }

  const newAccessToken = request.headers["access-token"];
  const newRefreshToken = request.headers["refresh-token"];

  if (newAccessToken && newRefreshToken) {
    setTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  }

  return request.data;
};
