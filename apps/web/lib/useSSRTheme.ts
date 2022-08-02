import { useTheme } from "next-themes";
import { useIsMounted } from "./useIsMounted";

export const useSSRTheme = () => {
  const theme = useTheme();
  const isMounted = useIsMounted();

  return isMounted() ? theme : null;
};
