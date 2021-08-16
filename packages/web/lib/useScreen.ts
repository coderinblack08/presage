import { useMediaQuery } from "react-responsive";

export const useScreen = () => {
  const isSmallerThanMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const isSmallerThanTablet = useMediaQuery({ query: "(max-width: 768px)" });
  const isSmallerThanDesktop = useMediaQuery({ query: "(max-width: 1024px)" });

  return { isSmallerThanMobile, isSmallerThanDesktop, isSmallerThanTablet };
};
