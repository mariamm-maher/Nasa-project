import { motion } from "framer-motion";

const GalaxyBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden will-change-transform">
      {/* Reduced stars count and optimized animations */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-70"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            willChange: "transform",
          }}
          animate={{
            scale: [0.5, 1, 0.5],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 30 + Math.random() * 30, // Slower animations
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        />
      ))}

      {/* Galaxy spiral - optimized */}
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

      {/* Nebula effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-900/10 via-transparent to-blue-900/10" />
    </div>
  );
};

export default GalaxyBackground;
