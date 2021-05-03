import { useMediaQuery } from "react-responsive";

export const useScreen = () => {
  const desktop = useMediaQuery({ minWidth: "1280px" });
  const tablet = useMediaQuery({ minWidth: "1024px" });
  const mobile = useMediaQuery({ minWidth: "768px" });

  if (desktop) {
    return "desktop";
  }
  if (tablet) {
    return "tablet";
  }
  if (mobile) {
    return "mobile";
  }
  return "fullscreen";
};
