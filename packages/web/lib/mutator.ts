import axios from "axios";

export const mutator = async ([path, body, method = "post"]: [
  string,
  any,
  "post" | "put" | "patch"
]) => {
  const isMultipart = body instanceof FormData;

  const config = {
    headers: {
      "content-type": isMultipart ? "multipart/form-data" : "application/json",
      authorization: "Bearer " + localStorage.getItem("access-token"),
    },
  };

  const request = await axios[method](
    "http://localhost:4000" + path,
    body,
    config
  );

  if (request.status !== 200) {
    throw new Error(request.data);
  }

  return request.data;
};
