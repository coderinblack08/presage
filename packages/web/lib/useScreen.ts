import { useMediaQuery } from "react-responsive";

export const useScreen = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });
  const isDesktop = useMediaQuery({ query: "(max-width: 1024px)" });

  return { isMobile, isTablet, isDesktop };
};
