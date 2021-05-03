import { useState, useEffect } from "react";
import { useScreen } from "../lib/useScreen";

export const useGridLayout = () => {
  const [gridTemplateColumns, setColumns] = useState("2.5fr 5fr 3fr");
  const screenType = useScreen();

  useEffect(() => {
    if (screenType === "desktop") {
      setColumns("2.5fr 5fr 3fr");
    } else if (screenType === "tablet") {
      setColumns(".75fr 8fr 3fr");
    } else if (screenType === "mobile") {
      setColumns("1fr 16fr");
    } else if (screenType === "fullscreen") {
      setColumns("1fr");
    }
  }, [screenType]);

  return gridTemplateColumns;
};
