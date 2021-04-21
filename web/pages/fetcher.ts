export const fetcher = (...args: [RequestInfo, RequestInit | undefined]) =>
  fetch(...args).then((res) => res.json());
