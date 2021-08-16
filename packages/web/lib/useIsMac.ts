import { useEffect, useState } from "react";

export const useIsMac = () => {
  const [isMac, setIsMac] = useState(false);
  useEffect(() => {
    setIsMac(navigator.platform.indexOf("Mac") > -1);
  }, []);
  return isMac;
};
