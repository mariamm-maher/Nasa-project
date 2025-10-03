import { useEffect, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";

const TypewriterText = ({ text, isComplete, onComplete }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Memoize the completion callback to prevent unnecessary re-renders
  const handleComplete = useCallback(() => {
    if (onComplete) {
      onComplete();
    }
  }, [onComplete]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 50); // Slightly slower to reduce render frequency
      return () => clearTimeout(timer);
    } else if (isComplete && currentIndex >= text.length) {
      handleComplete();
    }
  }, [currentIndex, text, isComplete, handleComplete]);

  // Memoize the cursor component to prevent re-renders
  const cursor = useMemo(
    () =>
      currentIndex < text.length ? (
        <motion.span
          className="text-cyan-400 ml-1"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "opacity" }}
        >
          |
        </motion.span>
      ) : null,
    [currentIndex, text.length]
  );

  return (
    <span style={{ willChange: "contents" }}>
      {displayText}
      {cursor}
    </span>
  );
};

export default TypewriterText;
