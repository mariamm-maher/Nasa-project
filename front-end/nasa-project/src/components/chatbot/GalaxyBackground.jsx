import { motion } from "framer-motion";

const GalaxyBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Floating stars */}
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-70"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0.5, 1, 0.5],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 20 + Math.random() * 20, // Much slower star movement
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Galaxy spiral */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 69, 255, 0.1) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)",
          filter: "blur(1px)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* Nebula effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-900/10 via-transparent to-blue-900/10" />
    </div>
  );
};

export default GalaxyBackground;
