import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TypewriterText = ({ text, isComplete, onComplete }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 30);
      return () => clearTimeout(timer);
    } else if (isComplete && onComplete) {
      onComplete();
    }
  }, [currentIndex, text, isComplete, onComplete]);

  return (
    <span>
      {displayText}
      {currentIndex < text.length && (
        <motion.span
          className="text-cyan-400 ml-1"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          |
        </motion.span>
      )}
    </span>
  );
};

export default TypewriterText;
