import { useState, useEffect } from "react";
import { useDurationStore } from "../../store/useDurationStore";
import { Presage } from "../../types";

export const useDuration = (presage: Presage) => {
  const [duration, setDuration] = useState(null);
  useEffect(() => {
    useDurationStore
      .getState()
      .getDuration(presage)
      .then((x) => {
        setDuration(x);
      });
  }, [presage]);

  return duration;
};
