import { useState } from "react";

const TOUR_KEY = "nodefold_tour_done";

export function useTour() {
  const [tourActive, setTourActive] = useState(
    () => localStorage.getItem(TOUR_KEY) !== "true",
  );

  const handleTourEnd = () => {
    localStorage.setItem(TOUR_KEY, "true");
    setTourActive(false);
  };

  const restartTour = () => {
    localStorage.removeItem(TOUR_KEY);
    setTourActive(true);
  };

  return { tourActive, handleTourEnd, restartTour };
}
