import { useCallback, useRef } from "react";

// Debounce utility for performance optimization
export const useDebounce = (func, delay) => {
  const debounceTimer = useRef();

  return useCallback(
    (...args) => {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => func(...args), delay);
    },
    [func, delay]
  );
};

// Throttle utility for scroll events
export const useThrottle = (func, delay) => {
  const throttleTimer = useRef();
  const lastExecTime = useRef(0);

  return useCallback(
    (...args) => {
      const currentTime = Date.now();

      if (currentTime - lastExecTime.current > delay) {
        func(...args);
        lastExecTime.current = currentTime;
      } else {
        clearTimeout(throttleTimer.current);
        throttleTimer.current = setTimeout(() => {
          func(...args);
          lastExecTime.current = Date.now();
        }, delay - (currentTime - lastExecTime.current));
      }
    },
    [func, delay]
  );
};

// Request animation frame utility for smooth animations
export const useAnimationFrame = (callback) => {
  const frameRef = useRef();

  return useCallback(
    (...args) => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = requestAnimationFrame(() => {
        callback(...args);
      });
    },
    [callback]
  );
};
