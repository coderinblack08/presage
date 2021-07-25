import axios from "axios";
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

  if (method === "delete") {
    request = await axios.delete(`${API_URL}/v1` + path, config);
  } else {
    request = await axios[method](`${API_URL}/v1` + path, body, config);
  }

  if (request.status !== 200) {
    throw new Error(request.data);
  }

  return request.data;
};
