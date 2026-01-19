// hooks/useGPS.js
import { useEffect, useState } from "react";

export default function useGPS() {
  const [gps, setGps] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("GPS not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGps({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy
        });
      },
      () => setError("GPS permission denied"),
      { enableHighAccuracy: true }
    );
  }, []);

  return { gps, error };
}
