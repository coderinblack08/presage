import { useState, useEffect, useCallback } from "react";

export const useDevices = () => {
  const [devices, setDevices] = useState<{ id: string; label: string }[]>([]);

  const fetchMics = useCallback(() => {
    navigator.mediaDevices?.getUserMedia({ audio: true }).then(() => {
      navigator.mediaDevices
        ?.enumerateDevices()
        .then((d) =>
          setDevices(
            d
              .filter(
                (device) => device.kind === "audioinput" && device.deviceId
              )
              .map(({ label, deviceId: id }) => ({ id, label }))
          )
        );
    });
  }, []);

  useEffect(() => {
    fetchMics();
  }, [fetchMics]);

  return {
    devices,
    fetchMics,
  };
};
