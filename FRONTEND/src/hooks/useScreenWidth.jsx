import { useState, useEffect } from "react";

export const useScreenWidth = () => {
  const [vp, setVp] = useState(null);

  useEffect(() => {
    const adjVp = () => {
      setVp((prev) => {
        const next = window.innerWidth < 800 ? "small" : "wide";
        return prev === next ? prev : next;
      });
    };

    window.addEventListener("resize", adjVp);

    adjVp();

    return () => window.removeEventListener("resize", adjVp);
  }, []);
  return vp;
};