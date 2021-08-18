import { useSSRMediaQuery } from "./useSSRMediaQuery";

export const useScreen = () => {
  const isSmallerThanMobile = useSSRMediaQuery("(max-width: 640px)");
  const isSmallerThanTablet = useSSRMediaQuery("(max-width: 768px)");
  const isSmallerThanDesktop = useSSRMediaQuery("(max-width: 1024px)");

  return { isSmallerThanMobile, isSmallerThanDesktop, isSmallerThanTablet };
};
