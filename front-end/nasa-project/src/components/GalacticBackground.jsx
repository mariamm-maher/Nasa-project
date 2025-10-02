import { motion } from "framer-motion";

const GalacticBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Base deep space gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950" />

      {/* Animated nebula clouds */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(ellipse at 20% 30%, rgba(6, 182, 212, 0.2) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)",
            "radial-gradient(ellipse at 70% 20%, rgba(236, 72, 153, 0.2) 0%, transparent 50%), radial-gradient(ellipse at 30% 80%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)",
            "radial-gradient(ellipse at 50% 90%, rgba(34, 197, 94, 0.2) 0%, transparent 50%), radial-gradient(ellipse at 90% 10%, rgba(251, 191, 36, 0.2) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* Rotating galaxy spirals */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`galaxy-${i}`}
          className="absolute inset-0"
          style={{
            background: `conic-gradient(from ${i * 120}deg, 
              transparent 0deg, 
              rgba(6, 182, 212, 0.1) 60deg, 
              transparent 120deg, 
              rgba(168, 85, 247, 0.1) 180deg, 
              transparent 240deg, 
              rgba(236, 72, 153, 0.1) 300deg, 
              transparent 360deg)`,
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 120 + i * 40,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Floating planets */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`planet-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${20 + i * 15}px`,
            height: `${20 + i * 15}px`,
            left: `${10 + i * 20}%`,
            top: `${15 + i * 15}%`,
            background: `radial-gradient(circle at 30% 30%, ${
              ["#06b6d4", "#a855f7", "#ec4899", "#3b82f6", "#22c55e"][i]
            }, ${["#0891b2", "#9333ea", "#db2777", "#2563eb", "#16a34a"][i]})`,
            boxShadow: `0 0 20px ${
              ["#06b6d4", "#a855f7", "#ec4899", "#3b82f6", "#22c55e"][i]
            }40`,
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 30, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 30 + i * 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Pulsing energy waves */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute inset-0 rounded-full border border-cyan-400 opacity-10"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [0, 4],
            opacity: [0.4, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            delay: i * 3,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Cosmic dust particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 20 + Math.random() * 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Shooting stars */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`shooting-star-${i}`}
          className="absolute w-2 h-0.5 bg-gradient-to-r from-white to-transparent rounded-full"
          style={{
            left: `${Math.random() * 50}%`,
            top: `${Math.random() * 50}%`,
          }}
          animate={{
            x: [0, 300],
            y: [0, 150],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 5 + Math.random() * 10,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Distant galaxies */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`distant-galaxy-${i}`}
          className="absolute w-8 h-8 rounded-full opacity-30"
          style={{
            left: `${20 + i * 15}%`,
            top: `${10 + i * 12}%`,
            background: `radial-gradient(ellipse, rgba(168, 85, 247, 0.3) 0%, transparent 70%)`,
            filter: "blur(2px)",
          }}
          animate={{
            scale: [0.5, 1.2, 0.8],
            opacity: [0.1, 0.4, 0.2],
            rotate: [0, 360],
          }}
          transition={{
            duration: 40 + i * 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Subtle grain texture overlay */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default GalacticBackground;
