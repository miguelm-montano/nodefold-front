import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

export function useTour() {
  const { user } = useAuth();
  const TOUR_KEY = `nodefold_tour_done_${user?.id}`;

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
