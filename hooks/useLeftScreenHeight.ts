import { useState, useEffect, useRef } from "react";
import useDeviceDimensions from "./useDeviceDimensions";

const useLeftScreenHeight = () => {
  const { screenHeight } = useDeviceDimensions();
  const divRef = useRef<HTMLDivElement>(null);
  const [leftHeight, setLeftHeight] = useState(0);

  useEffect(() => {
    if (divRef.current) {
      const { top, left } = divRef.current.getBoundingClientRect();
      setLeftHeight(screenHeight - top);
    }
  }, [screenHeight]);

  return { leftHeight, divRef };
};

export default useLeftScreenHeight;
