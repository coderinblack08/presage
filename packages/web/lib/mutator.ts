import axios from "axios";
import { useErrorStore } from "../components/ErrorToast";
import { API_URL } from "./constants";

export const mutator = async ([path, body, method = "post"]: [
  string,
  any,
  "post" | "put" | "patch" | "delete"
]) => {
  const isMultipart = body instanceof FormData;

  const config = {
    headers: {
      "content-type": isMultipart ? "multipart/form-data" : "application/json",
    },
    withCredentials: true,
  };

  let request: any;

  try {
    if (method === "delete") {
      request = await axios.delete(`${API_URL}/v1` + path, config);
    } else {
      request = await axios[method](`${API_URL}/v1` + path, body, config);
    }
  } catch (error) {
    if (error.response) {
      useErrorStore.getState().setError(error.response.data as Error);
      throw new Error(error.response.data);
    }
  }

  return request.data;
};
