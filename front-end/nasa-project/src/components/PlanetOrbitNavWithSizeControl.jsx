import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  MessageCircle,
  Search,
  BarChart3,
  Orbit,
  Sparkles,
} from "lucide-react";

const PlanetOrbitNavWithSizeControl = ({
  size = "small",
  customSunSize,
  customOrbitRadius,
  customPlanetSize,
  position = { top: "auto", right: "auto", bottom: "auto", left: "auto" },
  className = "",
  isExpanded: controlledIsExpanded,
  onExpandedChange,
}) => {
  const [internalIsExpanded, setInternalIsExpanded] = useState(false);
  const [hoveredPlanet, setHoveredPlanet] = useState(null);

  // Use controlled prop if provided, otherwise use internal state
  const isExpanded =
    controlledIsExpanded !== undefined
      ? controlledIsExpanded
      : internalIsExpanded;

  const navigate = useNavigate();
  const location = useLocation();

  // Size configurations
  const sizeConfigs = {
    small: {
      sunSize: 60,
      sunGlowSize: 90,
      planetSize: 18,
      orbitBaseRadius: 80,
      orbitRadiusStep: 15,
      iconSize: 10,
      labelOffset: 8,
      expandedOffset: { top: "6rem", right: "6rem" },
      collapsedOffset: { top: "1.5rem", right: "1.5rem" },
    },
    normal: {
      sunSize: 80,
      sunGlowSize: 130,
      planetSize: 24,
      orbitBaseRadius: 120,
      orbitRadiusStep: 20,
      iconSize: 12,
      labelOffset: 12,
      expandedOffset: { top: "10rem", right: "8.75rem" },
      collapsedOffset: { top: "2.5rem", right: "2.5rem" },
    },
    large: {
      sunSize: 100,
      sunGlowSize: 160,
      planetSize: 32,
      orbitBaseRadius: 160,
      orbitRadiusStep: 25,
      iconSize: 16,
      labelOffset: 16,
      expandedOffset: { top: "12rem", right: "10rem" },
      collapsedOffset: { top: "3rem", right: "3rem" },
    },
    huge: {
      sunSize: 120,
      sunGlowSize: 200,
      planetSize: 40,
      orbitBaseRadius: 200,
      orbitRadiusStep: 30,
      iconSize: 20,
      labelOffset: 20,
      expandedOffset: { top: "15rem", right: "12rem" },
      collapsedOffset: { top: "4rem", right: "4rem" },
    },
  };
  // Calculate final sizes based on props
  const config = useMemo(() => {
    const baseConfig = sizeConfigs[size] || sizeConfigs.normal;

    return {
      sunSize: customSunSize || baseConfig.sunSize,
      sunGlowSize: customSunSize
        ? customSunSize * 1.625
        : baseConfig.sunGlowSize,
      planetSize: customPlanetSize || baseConfig.planetSize,
      orbitBaseRadius: customOrbitRadius || baseConfig.orbitBaseRadius,
      orbitRadiusStep: baseConfig.orbitRadiusStep,
      iconSize: baseConfig.iconSize,
      labelOffset: baseConfig.labelOffset,
      expandedOffset: baseConfig.expandedOffset,
      collapsedOffset: baseConfig.collapsedOffset,
    };
  }, [size, customSunSize, customOrbitRadius, customPlanetSize, sizeConfigs]);

  const planets = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      path: "/",
      gradient:
        "radial-gradient(circle at 30% 30%, #60a5fa 0%, #3b82f6 40%, #1e40af 100%)", // Earth-like blue
      rings: false,
      orbitRadius: config.orbitBaseRadius,
      orbitDuration: 8,
    },
    {
      id: "chatbot",
      label: "Chatbot",
      icon: MessageCircle,
      path: "/chatbot",
      gradient:
        "radial-gradient(circle at 30% 30%, #86efac 0%, #22c55e 40%, #15803d 100%)", // Green planet
      rings: false,
      orbitRadius: config.orbitBaseRadius + config.orbitRadiusStep,
      orbitDuration: 10,
    },
    {
      id: "search",
      label: "Search",
      icon: Search,
      path: "/search",
      gradient:
        "radial-gradient(circle at 30% 30%, #fbbf24 0%, #f59e0b 40%, #b45309 100%)", // Saturn-like yellow/orange
      rings: true,
      orbitRadius: config.orbitBaseRadius + config.orbitRadiusStep * 2,
      orbitDuration: 12,
    },
    {
      id: "graph",
      label: "Graph",
      icon: BarChart3,
      path: "/graph",
      gradient:
        "radial-gradient(circle at 30% 30%, #fb923c 0%, #ea580c 40%, #c2410c 100%)", // Mars-like red/orange
      rings: false,
      orbitRadius: config.orbitBaseRadius + config.orbitRadiusStep * 0.5,
      orbitDuration: 9,
    },
    {
      id: "sources",
      label: "Sources",
      icon: Orbit,
      path: "/sources",
      gradient:
        "radial-gradient(circle at 30% 30%, #a78bfa 0%, #8b5cf6 40%, #581c87 100%)", // Purple planet
      rings: false,
      orbitRadius: config.orbitBaseRadius + config.orbitRadiusStep * 1.5,
      orbitDuration: 11,
    },
  ];
  const handlePlanetClick = (planet) => {
    navigate(planet.path);
    handleToggleExpanded(false);
  };

  const handleToggleExpanded = (newValue) => {
    const nextValue = newValue !== undefined ? newValue : !isExpanded;

    if (controlledIsExpanded === undefined) {
      // Uncontrolled mode
      setInternalIsExpanded(nextValue);
    }

    // Call callback if provided
    if (onExpandedChange) {
      onExpandedChange(nextValue);
    }
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };
  return (
    <>
      {" "}
      <motion.div
        className={`fixed z-50 ${className}`}
        initial={{
          top:
            position.top !== "auto" ? position.top : config.collapsedOffset.top,
          right:
            position.right !== "auto"
              ? position.right
              : config.collapsedOffset.right,
          bottom: position.bottom !== "auto" ? position.bottom : undefined,
          left: position.left !== "auto" ? position.left : undefined,
        }}
        animate={{
          top:
            position.top !== "auto"
              ? position.top
              : isExpanded
              ? config.expandedOffset.top
              : config.collapsedOffset.top,
          right:
            position.right !== "auto"
              ? position.right
              : isExpanded
              ? config.expandedOffset.right
              : config.collapsedOffset.right,
          bottom: position.bottom !== "auto" ? position.bottom : undefined,
          left: position.left !== "auto" ? position.left : undefined,
        }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
      >
        {" "}
        {/* Central Sun/Logo */}
        <motion.div
          className="relative cursor-pointer"
          onClick={() => handleToggleExpanded()}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.97 }}
        >
          {/* Sun Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,215,0,0.5) 0%, rgba(255,200,0,0.3) 60%, transparent 90%)",
              width: `${config.sunGlowSize}px`,
              height: `${config.sunGlowSize}px`,
              left: `${-(config.sunGlowSize - config.sunSize) / 2}px`,
              top: `${-(config.sunGlowSize - config.sunSize) / 2}px`,
              filter: "blur(2px)",
            }}
            animate={{
              scale: isExpanded ? [1, 1.18, 1] : [1, 1.08, 1],
              rotate: [0, 360],
            }}
            transition={{
              scale: { duration: 2, repeat: Infinity },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            }}
          />

          {/* Central Sun */}
          <motion.div
            className="rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden"
            style={{
              width: `${config.sunSize}px`,
              height: `${config.sunSize}px`,
              background:
                "radial-gradient(circle at 35% 35%, #fffacd 0%, #ffd700 25%, #ffb700 50%, #ff9500 75%, #ff7700 100%)",
            }}
            animate={{
              boxShadow: isExpanded
                ? [
                    `0 0 ${config.sunSize}px ${
                      config.sunSize * 0.25
                    }px #ffd700, 0 0 ${config.sunSize * 2}px ${
                      config.sunSize * 0.5
                    }px #ffd70099, 0 0 ${config.sunSize * 3}px ${
                      config.sunSize
                    }px #ffd70055`,
                    `0 0 ${config.sunSize * 2}px ${
                      config.sunSize * 0.5
                    }px #ffd700, 0 0 ${config.sunSize * 3}px ${
                      config.sunSize
                    }px #ffd70099, 0 0 ${config.sunSize}px ${
                      config.sunSize * 0.25
                    }px #ffd70055`,
                    `0 0 ${config.sunSize}px ${
                      config.sunSize * 0.25
                    }px #ffd700, 0 0 ${config.sunSize * 2}px ${
                      config.sunSize * 0.5
                    }px #ffd70099, 0 0 ${config.sunSize * 3}px ${
                      config.sunSize
                    }px #ffd70055`,
                  ]
                : [
                    `0 0 ${config.sunSize * 0.5}px ${
                      config.sunSize * 0.125
                    }px #ffd700, 0 0 ${config.sunSize}px ${
                      config.sunSize * 0.25
                    }px #ffd70055, 0 0 ${config.sunSize * 1.5}px ${
                      config.sunSize * 0.5
                    }px #ffd70033`,
                    `0 0 ${config.sunSize}px ${
                      config.sunSize * 0.25
                    }px #ffd700, 0 0 ${config.sunSize * 1.5}px ${
                      config.sunSize * 0.5
                    }px #ffd70033, 0 0 ${config.sunSize * 0.5}px ${
                      config.sunSize * 0.125
                    }px #ffd70055`,
                    `0 0 ${config.sunSize * 0.5}px ${
                      config.sunSize * 0.125
                    }px #ffd700, 0 0 ${config.sunSize}px ${
                      config.sunSize * 0.25
                    }px #ffd70055, 0 0 ${config.sunSize * 1.5}px ${
                      config.sunSize * 0.5
                    }px #ffd70033`,
                  ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {/* Solar flares effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent, rgba(255,250,205,0.3), transparent, rgba(255,215,0,0.2), transparent)",
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            {/* Inner bright core */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: `${config.sunSize * 0.6}px`,
                height: `${config.sunSize * 0.6}px`,
                background:
                  "radial-gradient(circle, #fffef0 0%, #fffacd 40%, transparent 70%)",
                filter: "blur(4px)",
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
        {/* Planet Orbits */}
        <AnimatePresence>
          {isExpanded && (
            <>
              {planets.map((planet, index) => {
                const Icon = planet.icon;
                const isActive = isActivePath(planet.path);
                const isHovered = hoveredPlanet === planet.id;
                return (
                  <motion.div
                    key={planet.id}
                    className="absolute cursor-pointer"
                    style={{
                      left: 0,
                      top: 0,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      rotate: 360,
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                      scale: { duration: 0.4, delay: index * 0.1 },
                      opacity: { duration: 0.4, delay: index * 0.1 },
                      rotate: {
                        duration: planet.orbitDuration,
                        repeat: Infinity,
                        ease: "linear",
                      },
                    }}
                    onClick={() => handlePlanetClick(planet)}
                    onHoverStart={() => setHoveredPlanet(planet.id)}
                    onHoverEnd={() => setHoveredPlanet(null)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Planet positioned at orbit radius */}
                    <div
                      style={{
                        transform: `translateX(${planet.orbitRadius}px)`,
                      }}
                    >
                      {/* Planet Rings (for Saturn-like planets) */}
                      {planet.rings && (
                        <motion.div
                          className="absolute rounded-full pointer-events-none"
                          style={{
                            width: `${config.planetSize * 2}px`,
                            height: `${config.planetSize * 2}px`,
                            left: `${-config.planetSize / 2}px`,
                            top: `${-config.planetSize / 2}px`,
                            border: "3px solid rgba(251, 191, 36, 0.4)",
                            borderRadius: "50%",
                            transform: "rotateX(75deg)",
                          }}
                          animate={{
                            opacity: isHovered ? [0.6, 0.8, 0.6] : 0.4,
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        />
                      )}

                      {/* Planet Glow/Atmosphere */}
                      <motion.div
                        className="absolute inset-0 rounded-full pointer-events-none"
                        style={{
                          background:
                            planet.gradient
                              .replace("radial-gradient", "radial-gradient")
                              .replace("100%)", "100%)")
                              .replace("circle at", "circle at 50% 50%, ") +
                            ", transparent 90%",
                          filter: "blur(6px)",
                          width: isHovered
                            ? `${config.planetSize * 2.3}px`
                            : `${config.planetSize * 1.8}px`,
                          height: isHovered
                            ? `${config.planetSize * 2.3}px`
                            : `${config.planetSize * 1.8}px`,
                          left: isHovered
                            ? `${-config.planetSize * 0.65}px`
                            : `${-config.planetSize * 0.4}px`,
                          top: isHovered
                            ? `${-config.planetSize * 0.65}px`
                            : `${-config.planetSize * 0.4}px`,
                          opacity: 0.6,
                        }}
                        animate={{
                          scale: isActive ? [1, 1.15, 1] : 1,
                        }}
                        transition={{
                          duration: 2,
                          repeat: isActive ? Infinity : 0,
                        }}
                      />

                      {/* Planet Body */}
                      <motion.div
                        className={`rounded-full flex items-center justify-center shadow-lg relative overflow-hidden cursor-pointer ${
                          isActive ? "ring-2 ring-white ring-opacity-80" : ""
                        }`}
                        style={{
                          width: `${config.planetSize}px`,
                          height: `${config.planetSize}px`,
                          background: planet.gradient,
                          boxShadow: isActive
                            ? "0 0 20px 4px rgba(255,255,255,0.5), inset -8px -8px 12px rgba(0,0,0,0.3)"
                            : "0 4px 12px rgba(0,0,0,0.4), inset -8px -8px 12px rgba(0,0,0,0.3)",
                        }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Icon
                          className="text-white z-10 drop-shadow-md"
                          style={{
                            width: `${config.iconSize}px`,
                            height: `${config.iconSize}px`,
                          }}
                        />

                        {/* Planet Surface Highlight */}
                        <motion.div
                          className="absolute inset-0 rounded-full opacity-40"
                          style={{
                            background:
                              "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 40%, transparent 70%)",
                          }}
                        />

                        {/* Planet Shadow */}
                        <div
                          className="absolute inset-0 rounded-full opacity-50"
                          style={{
                            background:
                              "radial-gradient(circle at 120% 120%, rgba(0,0,0,0.4) 0%, transparent 50%)",
                          }}
                        />

                        {/* Atmospheric glow on edge */}
                        <div
                          className="absolute inset-0 rounded-full opacity-30"
                          style={{
                            background:
                              "radial-gradient(circle at 50% 50%, transparent 60%, rgba(255,255,255,0.3) 80%, transparent 100%)",
                          }}
                        />
                      </motion.div>
                    </div>

                    {/* Planet Label */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          className="absolute left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-2 py-1 rounded text-sm whitespace-nowrap backdrop-blur-sm"
                          style={{ top: `${config.labelOffset * 3}px` }}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {planet.label}
                          <motion.div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                            <Sparkles className="w-3 h-3 text-yellow-400" />
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Orbit Trail */}
                    <motion.div
                      className="absolute border border-gray-600 border-opacity-30 rounded-full pointer-events-none"
                      style={{
                        width: planet.orbitRadius * 2,
                        height: planet.orbitRadius * 2,
                        left: -planet.orbitRadius,
                        top: -planet.orbitRadius,
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.3 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    />
                  </motion.div>
                );
              })}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default PlanetOrbitNavWithSizeControl;
