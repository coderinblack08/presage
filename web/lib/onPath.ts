import { useRouter } from "next/router";

export const useOnPath = () => {
  const router = useRouter();

  return (tab: string | string[]) =>
    typeof tab === "string"
      ? tab === router.pathname
      : tab.includes(router.pathname);
};
