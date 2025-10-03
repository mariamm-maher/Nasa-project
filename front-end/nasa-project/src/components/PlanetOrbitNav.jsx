import { useState } from "react";
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

const PlanetOrbitNav = () => {

  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredPlanet, setHoveredPlanet] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const planets = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      path: "/",
      gradient:
        "radial-gradient(circle at 30% 30%, #60a5fa 0%, #3b82f6 40%, #1e40af 100%)", // Earth-like blue
      rings: false,
      orbitRadius: 120,
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
      orbitRadius: 140,
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
      orbitRadius: 160,
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
      orbitRadius: 130,
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
      orbitRadius: 150,
      orbitDuration: 11,
    },
  ];

  const handlePlanetClick = (planet) => {
    navigate(planet.path);
    setIsExpanded(false);
  };
  const isActivePath = (path) => {
    return location.pathname === path;
  };
  return (
    
   <>
   {location.pathname !== "/chatbot" && (
     <motion.div
     className="fixed z-50"
     animate={{
       top: isExpanded ? "10rem" : "2.5rem", // top-40 vs top-10
       right: isExpanded ? "8.75rem" : "2.5rem", // right-35 vs right-10
     }}
     transition={{
       duration: 0.8,
       type: "spring",
       stiffness: 100,
       damping: 15,
     }}
   >
     {/* Central Sun/Logo */}
     <motion.div
       className="relative cursor-pointer"
       onClick={() => setIsExpanded(!isExpanded)}
       whileHover={{ scale: 1.12 }}
       whileTap={{ scale: 0.97 }}
     >
       {/* Sun Glow Effect */}
       <motion.div
         className="absolute inset-0 rounded-full"
         style={{
           background:
             "radial-gradient(circle, rgba(255,215,0,0.5) 0%, rgba(255,200,0,0.3) 60%, transparent 90%)",
           width: "130px",
           height: "130px",
           left: "-25px",
           top: "-25px",
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
       />{" "}
       {/* Central Sun (bigger, more sun-like with realistic yellow gradient) */}
       <motion.div
         className="w-20 h-20 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden "
         style={{
           background:
             "radial-gradient(circle at 35% 35%, #fffacd 0%, #ffd700 25%, #ffb700 50%, #ff9500 75%, #ff7700 100%)",
         }}
         animate={{
           boxShadow: isExpanded
             ? [
                 "0 0 80px 20px #ffd700, 0 0 160px 40px #ffd70099, 0 0 240px 80px #ffd70055",
                 "0 0 160px 40px #ffd700, 0 0 240px 80px #ffd70099, 0 0 80px 20px #ffd70055",
                 "0 0 80px 20px #ffd700, 0 0 160px 40px #ffd70099, 0 0 240px 80px #ffd70055",
               ]
             : [
                 "0 0 40px 10px #ffd700, 0 0 80px 20px #ffd70055, 0 0 120px 40px #ffd70033",
                 "0 0 80px 20px #ffd700, 0 0 120px 40px #ffd70033, 0 0 40px 10px #ffd70055",
                 "0 0 40px 10px #ffd700, 0 0 80px 20px #ffd70055, 0 0 120px 40px #ffd70033",
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
           className="absolute w-12 h-12 rounded-full"
           style={{
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
           {" "}
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
                 whileHover={{ scale: 1.2 }}
                 whileTap={{ scale: 0.95 }}
               >
                 {" "}
                 {/* Planet positioned at orbit radius (orbiting around sun!) */}
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
                         width: "50px",
                         height: "50px",
                         left: "-12px",
                         top: "-12px",
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
                       width: isHovered ? "56px" : "44px",
                       height: isHovered ? "56px" : "44px",
                       left: isHovered ? "-14px" : "-10px",
                       top: isHovered ? "-14px" : "-10px",
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
                     className={`w-6 h-6 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden cursor-pointer ${
                       isActive ? "ring-2 ring-white ring-opacity-80" : ""
                     }`}
                     style={{
                       background: planet.gradient,
                       boxShadow: isActive
                         ? "0 0 20px 4px rgba(255,255,255,0.5), inset -8px -8px 12px rgba(0,0,0,0.3)"
                         : "0 4px 12px rgba(0,0,0,0.4), inset -8px -8px 12px rgba(0,0,0,0.3)",
                     }}
                     whileHover={{ scale: 1.1 }}
                   >
                     <Icon className="w-3 h-3 text-white z-10 drop-shadow-md" />

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
                       className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-2 py-1 rounded text-sm whitespace-nowrap backdrop-blur-sm"
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
                 </AnimatePresence>{" "}
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
     </AnimatePresence>{" "}
     {/* Navigation Help Tooltip */}
     <AnimatePresence>
       {isExpanded && (
         <motion.div
           className="absolute pointer-events-none"
           style={{
             bottom: "-80px",
             left: "50%",
             transform: "translateX(-50%)",
           }}
           initial={{ opacity: 0, y: -10 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -10 }}
           transition={{ delay: 0.5 }}
         >
           <div className="bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-xs whitespace-nowrap border border-gray-700">
             <div className="flex items-center gap-2 mb-1">
               <span className="text-blue-400">🌍</span>
               <span>Click any planet to navigate</span>
             </div>
           </div>
         </motion.div>
       )}
     </AnimatePresence>
   </motion.div>
   )}
   </>
  );
};

export default PlanetOrbitNav;
