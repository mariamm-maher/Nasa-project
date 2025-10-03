import { memo, useMemo } from "react";
import { motion } from "framer-motion";

// Memoized star component to prevent re-renders
const Star = memo(({ delay, duration, style }) => (
  <motion.div
    className="absolute w-1 h-1 bg-white rounded-full opacity-70 galaxy-stars"
    style={style}
    animate={{
      scale: [0.5, 1, 0.5],
      opacity: [0.3, 1, 0.3],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "linear",
    }}
  />
));

Star.displayName = "Star";

// Memoized galaxy spiral to prevent re-renders
const GalaxySpiral = memo(() => (
  <motion.div
    className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full"
    style={{
      background:
        "radial-gradient(circle, rgba(139, 69, 255, 0.1) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)",
      willChange: "transform",
    }}
    animate={{ rotate: 360 }}
    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
  />
));

GalaxySpiral.displayName = "GalaxySpiral";

const OptimizedGalaxyBackground = memo(() => {
  // Pre-generate star configurations to prevent recalculation on re-renders
  const stars = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        delay: Math.random() * 5,
        duration: 30 + Math.random() * 30,
        style: {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          willChange: "transform",
        },
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden will-change-transform">
      {/* Optimized stars with memoization */}
      {stars.map((star) => (
        <Star
          key={star.id}
          delay={star.delay}
          duration={star.duration}
          style={star.style}
        />
      ))}

      {/* Memoized galaxy spiral */}
      <GalaxySpiral />

      {/* Nebula effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-900/10 via-transparent to-blue-900/10" />
    </div>
  );
});

OptimizedGalaxyBackground.displayName = "OptimizedGalaxyBackground";

export default OptimizedGalaxyBackground;
